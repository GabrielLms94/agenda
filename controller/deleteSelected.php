<?php

include 'connection.php';

$id = $_POST['id'];

$sql = "DELETE FROM agenda WHERE id=$id";

if ($con->query($sql) === TRUE) {
    header("Location: http://localhost/calendario/agenda.html");
    exit();
} else {
    echo "Error updating record: " . $con->error;
}

$con->close();
