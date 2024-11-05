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

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<Iterable<Tarefa>> getAllTarefas() {
        Iterable<Tarefa> tarefas = tarefaRepository.findAll();
        return ResponseEntity.ok(tarefas);
    }

    private ResponseEntity<Tarefa> salvarOuAtualizarTarefa(Tarefa tarefa, MultipartFile foto, String fotoSenha) {
        try {
            if (foto != null && !foto.isEmpty()) {
                String originalFilename = foto.getOriginalFilename();
                if (originalFilename != null) { // Verifica se o nome do arquivo não é nulo
                    String filename = StringUtils.cleanPath(originalFilename);
                    Path uploadPath = Paths.get("uploads/");
                    if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
    
                    Path filePath = uploadPath.resolve(filename);
                    Files.copy(foto.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    tarefa.setFotoUrl("/uploads/" + filename);
                }
            }
    
            if (fotoSenha != null && !fotoSenha.isEmpty()) {
                tarefa.setFotoSenha(passwordEncoder.encode(fotoSenha));
            }
    
            Tarefa tarefaSalva = tarefaRepository.save(tarefa);
            return ResponseEntity.status(HttpStatus.CREATED).body(tarefaSalva);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Tarefa> criarTarefa(
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "concluida", required = false) Boolean concluida,
            @RequestPart(name = "foto", required = false) MultipartFile foto,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {

        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(titulo);
        tarefa.setDescricao(descricao);
        tarefa.setConcluida(concluida != null ? concluida : false);
        return salvarOuAtualizarTarefa(tarefa, foto, fotoSenha);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(
            @PathVariable Long id,
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "concluida", required = false) Boolean concluida,
            @RequestPart(name = "foto", required = false) MultipartFile foto,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {
        
        Optional<Tarefa> tarefaExistente = tarefaRepository.findById(id);
        
        if (!tarefaExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Tarefa tarefa = tarefaExistente.get();
        tarefa.setTitulo(titulo);
        tarefa.setDescricao(descricao);
        tarefa.setConcluida(concluida != null ? concluida : tarefa.isConcluida());
        return salvarOuAtualizarTarefa(tarefa, foto, fotoSenha);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // src/main/java/com/example/tarefas/controller/TarefaController.java

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> getFoto(
            @PathVariable String filename,
            @RequestParam(value = "fotoSenha", required = false) String fotoSenha) {
        try {
            Path filePath = Paths.get("uploads/").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
    
            Optional<Tarefa> optionalTarefa = tarefaRepository.findByFotoUrl("/uploads/" + filename);
            if (optionalTarefa.isPresent()) {
                Tarefa tarefa = optionalTarefa.get();
    
                // Verifique se a tarefa possui uma senha e valide-a
                if (tarefa.getFotoSenha() != null) {
                    if (fotoSenha == null || fotoSenha.isEmpty() || !passwordEncoder.matches(fotoSenha, tarefa.getFotoSenha())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Retorna 401 para senha incorreta ou ausente
                    }
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se a tarefa não for encontrada
            }
    
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

}
