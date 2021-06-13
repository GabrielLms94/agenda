<?php

include 'connection.php';

$id = $_POST['id_fecha'];
$lugar =$_POST['lugar'];
$fecha =$_POST['fecha'];
$descripcion =$_POST['descripcion'];

$sql = "UPDATE agenda SET lugar='$lugar', descripcion='$descripcion', fecha='$fecha' WHERE id=$id";

if ($con->query($sql) === TRUE) {
    header("Location: http://localhost/calendario/index.html");
    exit();
} else {
    echo "Error updating record: " . $con->error;
}

$con->close();