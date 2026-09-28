<?php 
$servername = "localhost";
$username = "u683142670_Jessica";
$password = "Stanleydam2502!";
$dbname ="u683142670_blog";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed" . $conn->connection_error);
}
?>