package com.example.tarefas.controller;

import com.example.tarefas.model.Tarefa;
import com.example.tarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Método para obter todas as tarefas
    @GetMapping
    public ResponseEntity<Iterable<Tarefa>> getAllTarefas() {
        Iterable<Tarefa> tarefas = tarefaRepository.findAll();
        return ResponseEntity.ok(tarefas);
    }

    // Método para criar uma nova tarefa
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Tarefa> criarTarefa(
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "concluida", required = false) Boolean concluida,
            @RequestPart(name = "foto", required = false) MultipartFile foto,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {
        try {
            Tarefa tarefa = new Tarefa();
            tarefa.setTitulo(titulo);
            tarefa.setDescricao(descricao);
            tarefa.setConcluida(concluida != null ? concluida : false);

            if (foto != null && !foto.isEmpty()) {
                String originalFilename = foto.getOriginalFilename();
                if (originalFilename != null && !originalFilename.isEmpty()) {
                    String filename = StringUtils.cleanPath(originalFilename);
                    Path uploadPath = Paths.get("uploads/");
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }
                    Path filePath = uploadPath.resolve(filename);
                    Files.copy(foto.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    tarefa.setFotoUrl("/uploads/" + filename);
                }
            }

            if (fotoSenha != null && !fotoSenha.isEmpty()) {
                String hashedSenha = passwordEncoder.encode(fotoSenha);
                tarefa.setFotoSenha(hashedSenha);
            }

            Tarefa tarefaSalva = tarefaRepository.save(tarefa);
            return ResponseEntity.status(HttpStatus.CREATED).body(tarefaSalva);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Método para atualizar uma tarefa existente
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarTarefa(
            @PathVariable Long id,
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "concluida", required = false) Boolean concluida,
            @RequestPart(name = "foto", required = false) MultipartFile foto,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setTitulo(titulo);
                    tarefa.setDescricao(descricao);
                    if (concluida != null) {
                        tarefa.setConcluida(concluida);
                    }

                    if (foto != null && !foto.isEmpty()) {
                        String originalFilename = foto.getOriginalFilename();
                        if (originalFilename != null && !originalFilename.isEmpty()) {
                            String filename = StringUtils.cleanPath(originalFilename);
                            Path uploadPath = Paths.get("uploads/");
                            try {
                                if (!Files.exists(uploadPath)) {
                                    Files.createDirectories(uploadPath);
                                }
                                Path filePath = uploadPath.resolve(filename);
                                Files.copy(foto.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                                tarefa.setFotoUrl("/uploads/" + filename);
                            } catch (IOException e) {
                                e.printStackTrace();
                                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a foto");
                            }
                        }
                    }

                    if (fotoSenha != null && !fotoSenha.isEmpty()) {
                        String hashedSenha = passwordEncoder.encode(fotoSenha);
                        tarefa.setFotoSenha(hashedSenha);
                    }

                    Tarefa tarefaAtualizada = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(tarefaAtualizada);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa não encontrada"));
    }

    // Método para deletar uma tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para servir fotos protegidas
    @GetMapping("/fotos/{filename}")
    public ResponseEntity<Resource> getFoto(
            @PathVariable String filename,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {
        try {
            Path filePath = Paths.get("uploads/").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            Optional<Tarefa> optionalTarefa = tarefaRepository.findByFotoUrl("/uploads/" + filename);
            if (optionalTarefa.isPresent()) {
                Tarefa tarefa = optionalTarefa.get();
                if (tarefa.getFotoSenha() != null) {
                    if (fotoSenha == null || !passwordEncoder.matches(fotoSenha, tarefa.getFotoSenha())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                    }
                }
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
