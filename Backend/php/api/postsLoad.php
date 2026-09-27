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
            if (isset($data['id'])) {
                $id = $data['id'];

                $stmt = $conn->prepare('SELECT * FROM news WHERE newsId = ?');
                $stmt->bind_param('i', $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $news = $result->fetch_assoc();

                if (!$news) {
                    echo json_encode(['success' => false, 'message' => 'Article not found']);
                    exit;
                }

                echo json_encode($news);
                exit;
            }

            $stmt = $conn->prepare('SELECT * FROM news');
            $stmt->execute();
            $result = $stmt->get_result();

            $news = [];

            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }

            echo json_encode($news);
            exit;

        case 'bookReview':
            if (isset($data['id'])) {
                $id = $data['id'];

                $stmt = $conn->prepare('SELECT * FROM bookReview WHERE bookReviewId = ?');
                $stmt->bind_param('i', $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $books = $result->fetch_assoc();

                if (!$books) {
                    echo json_encode(['success' => false, 'message' => 'Book not found']);
                    exit;
                }

                echo json_encode($books);
                exit;
            }
            $stmt = $conn->prepare('SELECT * FROM bookReview');
            $stmt->execute();
            $result = $stmt->get_result();

            $books = [];

            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }

            echo json_encode($books);
            exit;

        case 'movieReview':
            
            if (isset($data['id'])) {
                $id = $data['id'];

                $stmt = $conn->prepare('SELECT * FROM movieReview WHERE movieReviewId = ?');
                $stmt->bind_param('i', $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $movie = $result->fetch_assoc();

                if (!$movie) {
                    echo json_encode(['success' => false, 'message' => 'Book not found']);
                    exit;
                }

                echo json_encode($movie);
                exit;
            }
            $stmt = $conn->prepare('SELECT * FROM movieReview');
            $stmt->execute();
            $result = $stmt->get_result();

            $movie = [];

            while ($row = $result->fetch_assoc()) {
                $movie[] = $row;
            }

            echo json_encode($movie);
            exit;

        default:

            echo json_encode([
                "success" => false,
                "message" => "Unknown category"
            ]);
            exit;
    }
}

?>