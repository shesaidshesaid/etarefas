package com.example.tarefas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private boolean concluida;

    private String fotoUrl;

    private String fotoSenha; // Novo campo para a senha da foto

    // Construtor padrão
    public Tarefa() {
    }

    // Construtor com parâmetros
    public Tarefa(String titulo, String descricao, boolean concluida, String fotoUrl, String fotoSenha) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = concluida;
        this.fotoUrl = fotoUrl;
        this.fotoSenha = fotoSenha;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    // O setter para id não é necessário, pois é gerado automaticamente

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getFotoSenha() {
        return fotoSenha;
    }

    public void setFotoSenha(String fotoSenha) {
        this.fotoSenha = fotoSenha;
    }
}
