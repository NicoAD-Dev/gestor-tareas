CREATE DATABASE IF NOT EXISTS gestor_tareas;
USE gestor_tareas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  estado ENUM('Pendiente', 'En Proceso', 'Completada') NOT NULL DEFAULT 'Pendiente'
);
