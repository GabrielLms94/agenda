<?php

$ip = "localhost";
$usuariodb = "root";
$passworddb = "";
$db = "agenda";
$port = 3306;
$con = new mysqli($ip, $usuariodb, $passworddb, $db, $port);

if ( $con->connect_errno ) {
    echo "Fallo al conectar a MySQL: (" . $con->connect_errno . ") " . $con->connect_error;
}

//echo $con->host_info . "\n";
