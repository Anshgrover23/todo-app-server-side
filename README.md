# Todo App Server-Side

A Dockerized **full-stack Todo application** featuring a **Node.js** backend, **PostgreSQL** database with **Prisma ORM**, and **JWT-based authentication** for secure user sessions.

---

## Features

- **JWT Authentication** for user security.
- **CRUD Operations**: Add, retrieve, update, and delete todos.
- **PostgreSQL** with Prisma ORM for robust database management.
- **Dockerized setup** for streamlined deployment.

---

## Prerequisites

Ensure you have the following installed:

- **Docker Desktop**
- **Node.js** (v20+)
- **npm**

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anshgrover23/todo-app-server-side.git
   cd todo-app-server-side
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Build Docker Images**:
   ```bash
   docker compose build
   ```

4. **Set Up PostgreSQL Migrations**:
- To create and apply initial migrations:

   ```bash
   docker compose run app npx prisma migratedev--name init
   ```
- To apply existing migrations:

   ```bash
   docker compose run app npx prisma migrate deploy
   ```

5. **Start Docker Containers**:
   ```bash
   docker compose up
   ```

6. **Access the App**

- Open http://localhost:8383 in your browser (or http://localhost:8383 if configured differently) to access the frontend. Register, log in, and manage your todo list!




This project is licensed under the [MIT License](license.md).
