<?php 
$servername = "mariadb";
$username = "jessica";
$password = "1234";
$dbname ="blog_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed" . $conn->connection_error);
}
?>