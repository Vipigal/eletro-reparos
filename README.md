# Eletro-Reparos - Back-End

Este projeto é um back-end para o projeto da matéria de Engenharia de Software do DCC da UFMG.
Foi desenvolvido em Node.js com NestJS, utilizando Clean Architecture, Sequelize ORM e PostgreSQL.
Ele faz parte de um sistema de gestão para uma oficina de conserto de eletrodomésticos, permitindo a criação de orçamentos, gerenciamento de clientes, aparelhos, peças e muito mais.

## Pré-requisitos

- **Node.js** (v18 ou superior)
- **NPM** (geralmente instalado com o Node)
- **Docker** e **Docker Compose** (para executar o banco de dados Postgres em um container)

## Instruções para rodar o projeto

### Rodando via Docker

- Inicie os serviços com o comando 
```bash
docker compose up
```
- Navegue para o endereço http:localhost:3000/api e teste as rotas.

### Rodando via NPM

- Instale as dependências do projeto com
```bash
npm install
```

- Rode o projeto em ambiente de desenvolvimento utilizando
```bash
npm run dev
```

### Rodando os testes da aplicação

- Instale as dependências do projeto com
```bash
npm install
```

- Rode os testes com o comando
```bash
npm run test
```




