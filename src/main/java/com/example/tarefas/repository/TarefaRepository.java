package com.example.tarefas.repository;

import com.example.tarefas.model.Tarefa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TarefaRepository extends CrudRepository<Tarefa, Long> {
    Optional<Tarefa> findByFotoUrl(String fotoUrl);
}
