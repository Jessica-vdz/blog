<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require '../index.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON"
    ]);
    exit;
}

if (!isset($data['email'], $data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

$stmt = $conn->prepare(
    "SELECT userId, name, password, admin FROM `user` WHERE email = ?"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database query failed",
        "error" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
    exit;
}

$stmt->bind_result($userId, $name, $hashedPassword, $admin);
$stmt->fetch();

if (password_verify($password, $hashedPassword)) {
    echo json_encode([
        "success" => true,
        "user" => [
            "userId" => $userId,
            "name" => $name,
            "admin" => $admin
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Wrong password"
    ]);
}

$stmt->close();
$conn->close();
?>
