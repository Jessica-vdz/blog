<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../index.php';
if($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if(!isset($data['name'], $data['email'], $data['password'])) {
        echo "Missing Fields";
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'],PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO user (name, email, password) VALUES(?,?,?)");
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()){
        echo("registration complete");
    } else {
        echo("hier ging iets mis") . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>