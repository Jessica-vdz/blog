<?php 
$servername = "localhost";
$username = "";
$password = "";
$dbname ="";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed" . $conn->connection_error);
}
?>