# Todo App Server-Side

A simple **server-side Todo application** built with **Node.js**, **Express.js**, and **SQLite**, featuring secure **JWT-based authentication** and CRUD functionality.

---

## Features

- **JWT Authentication** for user security
- **CRUD Operations**: Add, retrieve, update, and delete todos
- **SQLite** for lightweight database storage

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v20+)
- **SQLite**

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anshgrover23/todo-app-server-side.git
   cd todo-app-server-side
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
- Create a `.env` file in the project root.
- Add your `JWT_SECRET`:
  ```bash
  JWT_SECRET=your_secret_key
  ```
4. **Start the server**:
   ```bash
   npm run dev
   ```
## License
This project is licensed under the MIT License
