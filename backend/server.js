const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "gestor_tareas",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// Registro de usuarios
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO usuarios (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Usuario registrado" });
    }
  );
});

// Login de usuarios
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      const token = jwt.sign({ id: results[0].id }, "secret_key", { expiresIn: "1h" });
      res.json({ token });
    }
  );
});

// Obtener tareas
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tareas", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear tarea
app.post("/tasks", (req, res) => {
  const { titulo, descripcion, estado } = req.body;
  db.query(
    "INSERT INTO tareas (titulo, descripcion, estado) VALUES (?, ?, ?)",
    [titulo, descripcion, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Tarea creada" });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor backend corriendo en http://localhost:3000");
});
