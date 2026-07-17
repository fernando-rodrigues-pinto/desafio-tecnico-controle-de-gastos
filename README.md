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
* C# .NET 8 (ou superior)
* Entity Framework Core (EF Core)

---

## Como executar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:
* [Node.js](https://nodejs.org/) (versão 18+ recomendada)
* [.NET SDK](https://dotnet.microsoft.com/download) (versão 8.0 ou superior)
* CLI do Entity Framework Core. Caso não tenha, instale globalmente via terminal:

    dotnet tool install --global dotnet-ef

### 2. Configurando e rodando o Backend (C#)

1. Abra um terminal e navegue até a pasta do backend:

```bash
cd backend
```

2. Restaure as dependências do projeto:

```bash
dotnet restore
```

3. Configure a conexão com o banco de dados. Crie uma cópia do arquivo ``appsettingsExample.json`` (ou utilize o arquivo de exemplo do repositório), o renomeie para ``appsettingsExample`` e preencha a chave DefaultConnection com os dados do seu servidor SQL, usuário e senha.

4. Crie o banco de dados e aplique as migrations estruturais:

```bash
dotnet ef database update
```

5. Inicie o servidor:

```bash
dotnet run
```

### 3. Configurando e rodando o Frontend (React)

1. Abra um novo terminal e navegue até a pasta do frontend:

```bash
cd frontend
```

2. Crie um arquivo chamado .env na raiz da pasta frontend e adicione a seguinte linha para conectar a interface à API:

```
VITE_API_URL=http://localhost:5245/api
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

## Estrutura do Projeto

O projeto segue uma arquitetura baseada em recursos (Feature-Sliced Design simplificado) no frontend, garantindo escalabilidade e facilidade de manutenção:

* /frontend/src/api: Configuração do Axios e rotas HTTP.
* /frontend/src/components: Componentes visuais globais (Inputs, Buttons, Modais).
* /frontend/src/features: Lógica de negócio e telas divididas por domínio (pessoas, transações, totais).
* /frontend/src/hooks: Gerenciamento de estado global e cache (useGastosData).