# Sistema de Controle de Gastos

Uma aplicação web full-stack para gerenciamento financeiro pessoal. Permite o cadastro de pessoas, registro de transações (receitas e despesas) e visualização de totais calculados automaticamente.

## Funcionalidades e Regras de Negócio

* **Gestão de Pessoas:** Cadastro e listagem de usuários com cálculo de idade.
* **Gestão de Transações:** Registro de movimentações financeiras com máscara automática de moeda (centavos).
* **Regra de Menores de Idade:** O sistema bloqueia automaticamente o registro de "Receitas" para pessoas menores de 18 anos, permitindo apenas "Despesas".
* **Exclusão em Cascata:** Ao remover uma pessoa, todas as suas transações vinculadas são excluídas automaticamente por segurança.
* **Dashboard de Totais:** Resumo automático de receitas, despesas e saldo (geral e individual).
* **UI/UX:** Interface responsiva, com suporte nativo a Dark Mode e modais com animações fluidas.

## Tecnologias Utilizadas

**Frontend:**
* React + Vite
* TypeScript
* Tailwind CSS v4
* Axios

**Backend:**
* C# .NET 8
* Entity Framework Core (EF Core)

**Infraestrutura:**
* Docker & Docker Compose
* MySQL 8.0

---

## Como executar o projeto localmente

A aplicação foi totalmente conteinerizada para garantir uma execução livre de erros e sem necessidade de configurações manuais de ambiente.

### 1. Pré-requisito
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando na sua máquina.

### 2. Rodando a aplicação

1. Clone o repositório e acesse a pasta raiz do projeto.
2. Copie o arquivo de exemplo de variáveis de ambiente para criar o seu arquivo `.env` oficial. Rode o comando no terminal (na raiz do projeto):
```bash
cp .env.example .env
```
Abra o arquivo .env recém-criado e configure a senha do banco de dados alterando o valor da variável MYSQL_ROOT_PASSWORD: `MYSQL_ROOT_PASSWORD=sua_senha_aqui`
3. Execute o comando abaixo para iniciar todos os serviços:
```bash
docker compose up -d --build
```
Acesso ao Frontend: Abra o navegador em http://localhost:5174.

Acesso à API (Swagger): Disponível em http://localhost:5245/swagger.
   
### 3. Encerrando a aplicação
Para encerrar a aplicação, execute o comando abaixo:
```bash
docker compose down
```