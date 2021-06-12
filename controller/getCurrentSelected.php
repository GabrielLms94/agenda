<?php

include 'connection.php';

$id = $_POST['id'];


$sql = "SELECT * FROM agenda where id=$id";

$result = mysqli_query($con, $sql);

$json_array = array();

while ($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
}
header('Content-Type: application/json');
echo json_encode($json_array, true);
exit();

$con ->close();