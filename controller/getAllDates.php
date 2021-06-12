<?php

include 'connection.php';

$sql = "SELECT * FROM agenda order by fecha asc ";

$result = mysqli_query($con, $sql);

$json_array = array();

while ($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
}
header('Content-Type: application/json');
echo json_encode($json_array, true);
exit();

$con ->close();
