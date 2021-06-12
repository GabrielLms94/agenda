<?php

include 'connection.php';

$place = $_POST['lugar'];
$description = $_POST['descripcion'];
$date = $_POST['fecha'];
$hour = $_POST['hora'];

echo $place.' '.$description.' '. $date. ' '.$hour;

$sql = "INSERT INTO agenda (lugar, descripcion, fecha, hora) values ('$place', '$description', '$date', '$hour')";

if (mysqli_query($con, $sql)) {
    echo json_encode("Guardado correctamente");
} else {
    echo json_encode(`Error: `,$sql,mysqli_error($con));
}

$con ->close();