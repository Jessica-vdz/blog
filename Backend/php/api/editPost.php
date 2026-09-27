<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require '../index.php';

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    exit;
}

if (!isset($data["category"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

$category = $data["category"];

switch ($category) {
    case "news":
        $newsId = $data["newsId"];
        $title = $data['title'];
        $description = $data['description'];
        $text = $data['text'];

        $stmt = $conn->prepare('UPDATE news SET title = ?, description = ?, text = ? WHERE newsid = ?');
        $stmt->bind_param('sssi', $title, $description, $text ,$newsId);
        $stmt->execute();
        $stmt->close();
        exit;

    case "bookReview":
        exit;

    case "movieReview":
        exit;
}
?>