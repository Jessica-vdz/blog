<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require '../index.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests allowed"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["category"])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing category"
    ]);
    exit;
}

$category = $data["category"];

switch ($category) {

    case "news":

        if (
            !isset($data["newsId"]) ||
            !isset($data["title"]) ||
            !isset($data["description"]) ||
            !isset($data["text"])
        ) {
            echo json_encode([
                "success" => false,
                "message" => "Missing news fields"
            ]);
            exit;
        }

        $newsId = (int) $data["newsId"];
        $title = $data["title"];
        $description = $data["description"];
        $text = $data["text"];

        $stmt = $conn->prepare("UPDATE news SET title = ?, description = ?, text = ? WHERE newsId = ?");
        $stmt->bind_param("sssi", $title, $description, $text, $newsId);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "News updated successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => $stmt->error
            ]);
        }

        $stmt->close();
        exit;


    case "bookReview":
        echo json_encode([
            "success" => false,
            "message" => "Book update not implemented yet"
        ]);
        exit;


    case "movieReview":
        echo json_encode([
            "success" => false,
            "message" => "Movie update not implemented yet"
        ]);
        exit;


    default:
        echo json_encode([
            "success" => false,
            "message" => "Unknown category"
        ]);
        exit;
}
?>
