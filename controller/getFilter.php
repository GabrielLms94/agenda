<?php

include 'connection.php';

$datos = $_POST['datos'];

$sql = "SELECT * FROM agenda where lugar like '%$datos%' or fecha like '%$datos%' or hora like '%$datos%' or descripcion like '%$datos%' ";

$result = mysqli_query($con, $sql);

$json_array = array();

while ($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
}
header('Content-Type: application/json');
echo json_encode($json_array, true);
exit();

$con ->close();
