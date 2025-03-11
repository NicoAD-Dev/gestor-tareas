<?php
$conexion = new mysqli("db", "root", "password", "gestor_tareas");

$resultado = $conexion->query("SELECT estado, COUNT(*) as cantidad FROM tareas GROUP BY estado");

$data = [];
while ($fila = $resultado->fetch_assoc()) {
    $data[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($data);
?>
