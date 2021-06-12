<?php

include 'connection.php';

$id = $_POST['id_fecha'];
$lugar =$_POST['lugar'];
$fecha =$_POST['fecha'];
$descripcion =$_POST['descripcion'];

$sql = "UPDATE agenda SET lugar='$lugar', descripcion='$descripcion', fecha='$fecha' WHERE id=$id";

if ($con->query($sql) === TRUE) {
//    header("Location: http://localhost/calendario/agenda.html");
//    exit();
    echo json_encode('Actualizado correctamente');
} else {
    echo json_encode("Error updating record: " . $con->error);
}

$con->close();