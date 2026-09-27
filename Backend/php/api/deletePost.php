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

        $stmt = $conn->prepare("DELETE news WHERE newsId = ?");
        $stmt->bind_param("i", $newsId);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $news = $result->fetch_assoc();

        echo json_encode($news);
        exit;

    case "bookReview":
        exit;

    case "movieReview":
        exit;
}
?>