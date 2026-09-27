<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require '../index.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['category'])) {
        echo json_encode(["success" => false, "message" => "Missing fields"]);
        exit;
    }
    $category = $data['category'];

    switch ($category) {
        case 'news':
            $title = $data['title'];
            $description = $data['description'];
            $text = $data['text'];

            $stmt = $conn->prepare('INSERT INTO news (title, description, text) VALUES (?,?, ?)');
            $stmt->bind_param('sss', $title, $description, $text);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Post made']);
            }

            break;

        case 'bookReview':
            $title = $data['title'];
            $stars = $data['stars'];
            $description = $data['description'];
            $review = $data['review'];
            $author = $data['author'];

            $stmt = $conn->prepare('INSERT INTO bookReview (title, stars, description, review, author) VALUES(?,?,?,?,?)');
            $stmt->bind_param('sisss', $author, $stars, $description, $review, $author);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Post made']);
            }
            break;

        case 'movieReview':
            $title = $data['title'];
            $stars = $data['stars'];
            $description = $data['description'];
            $review = $data['review'];
            
            $stmt = $conn->prepare('INSERT INTO movieReview (title, stars, description, review) VALUES (?,?,?,?)');
            $stmt->bind_param('siss', $title, $stars,$description, $review);

            if ($stmt->execute()) {
                echo json_encode(['success'=> true,'message'=> 'Post made']);
            }
            break;
    }

    $stmt->close();
    $conn->close();
}
?>