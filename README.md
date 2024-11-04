# tarefas
Projeto de gerenciamento de tarefas usando Spring Boot e React

### Link para o Projeto em Produção
O projeto está disponível no Heroku: [https://protected-gorge-65520-26115e348254.herokuapp.com/](https://protected-gorge-65520-26115e348254.herokuapp.com/)

---

## Tecnologias Utilizadas

- **Backend**: Spring Boot, Hibernate (ORM), API REST.
- **Banco de Dados**: MySQL via JawsDB (Heroku).
- **Frontend**: React, Redux, Redux-Saga, Ant Design (para componentes de UI).
- **Hospedagem**: Heroku.

---

## Funcionalidades

- **Cadastro de Tarefas**: Adicione novas tarefas com título e descrição.
- **Listagem de Tarefas**: Veja uma lista de todas as tarefas criadas.
- **Marcar como Concluído**: Clique para concluir tarefas e altere o status de cada uma.
- **Excluir Tarefas**: Exclua tarefas quando não forem mais necessárias.
- **Filtragem por Status**: Filtro de tarefas entre pendentes e finalizadas.

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- **Java 11+**
- **Node.js** e **npm** (ou **yarn**)
- **MySQL** (ou configurar JawsDB caso tenha acesso)

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/tarefas.git
   cd tarefas
   ```

2. **Configuração do Backend**:
   - Acesse o diretório do backend (`/src/main/resources`) e configure o arquivo `application.properties` para conectar ao seu banco de dados local (ou use uma variável de ambiente para o JawsDB).
   - Exemplo de configuração:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     spring.jpa.hibernate.ddl-auto=update
     ```

3. **Configuração do Frontend**:
   - Acesse a pasta `tarefasfrontend` e instale as dependências:
     ```bash
     cd tarefasfrontend
     npm install
     ```

4. **Rodar o Backend**:
   - Volte ao diretório principal e inicie o backend usando Maven:
     ```bash
     ./mvnw spring-boot:run
     ```

5. **Rodar o Frontend**:
   - No diretório `tarefasfrontend`, execute:
     ```bash
     npm start
     ```

6. **Acessar a Aplicação**:
   - O backend estará disponível em `http://localhost:8080`, e o frontend em `http://localhost:3000`.

---

## Estrutura do Projeto

```
tarefas/
├── tarefasfrontend/         # Código do frontend em React
├── src/                     # Código do backend em Java com Spring Boot
│   ├── main/
│   │   ├── java/com/example/tarefas/
│   │   └── resources/
├── .gitignore
├── pom.xml                  # Dependências e configurações Maven
└── README.md                # Documentação do projeto
```

---

## Como Contribuir

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** para sua funcionalidade (`git checkout -b minha-feature`).
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. **Push** para a branch (`git push origin minha-feature`).
5. Abra um **Pull Request**.

---

## Melhorias Futuras

- Implementação de testes automatizados.
- Adicionar autenticação para usuários.
- Melhorias de design e responsividade.

---

## Contato

Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato.
