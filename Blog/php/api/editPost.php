<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require '../index.php';


if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    exit;
}


if ($_SERVER['REQUEST_METHOD'] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed"
    ]);

    exit;
}


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON"
    ]);

    exit;
}


if (!isset($data["category"])) {

    echo json_encode([
        "success" => false,
        "message" => "Missing category"
    ]);

    exit;
}


$category = $data["category"];


switch ($category) {


    /* =====================================================
       NEWS
    ===================================================== */

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


        $newsId =
            (int) $data["newsId"];

        $title =
            $data["title"];

        $description =
            $data["description"];

        $text =
            $data["text"];


        $stmt = $conn->prepare(
            "UPDATE news
             SET title = ?,
                 description = ?,
                 text = ?
             WHERE newsId = ?"
        );


        if (!$stmt) {

            echo json_encode([
                "success" => false,
                "message" => $conn->error
            ]);

            exit;
        }


        $stmt->bind_param(
            "sssi",
            $title,
            $description,
            $text,
            $newsId
        );


        if (!$stmt->execute()) {

            echo json_encode([
                "success" => false,
                "message" => $stmt->error
            ]);

            exit;
        }


        echo json_encode([
            "success" => true,
            "message" => "News updated"
        ]);

        exit;


    /* =====================================================
       BOOK REVIEW
    ===================================================== */

    case "bookReview":

        if (
            !isset($data["bookReviewId"]) ||
            !isset($data["title"]) ||
            !isset($data["author"]) ||
            !isset($data["stars"]) ||
            !isset($data["description"]) ||
            !isset($data["review"])
        ) {

            echo json_encode([
                "success" => false,
                "message" => "Missing book fields"
            ]);

            exit;
        }


        $bookReviewId =
            (int) $data["bookReviewId"];

        $title =
            $data["title"];

        $author =
            $data["author"];

        $stars =
            (int) $data["stars"];

        $description =
            $data["description"];

        $review =
            $data["review"];


        $stmt = $conn->prepare(
            "UPDATE bookReview
             SET title = ?,
                 author = ?,
                 stars = ?,
                 description = ?,
                 review = ?
             WHERE bookReviewId = ?"
        );


        if (!$stmt) {

            echo json_encode([
                "success" => false,
                "message" => $conn->error
            ]);

            exit;
        }


        $stmt->bind_param(
            "ssissi",
            $title,
            $author,
            $stars,
            $description,
            $review,
            $bookReviewId
        );


        if (!$stmt->execute()) {

            echo json_encode([
                "success" => false,
                "message" => $stmt->error
            ]);

            exit;
        }


        echo json_encode([
            "success" => true,
            "message" => "Book review updated"
        ]);

        exit;


    /* =====================================================
       MOVIE REVIEW
    ===================================================== */

    case "movieReview":

        if (
            !isset($data["movieReviewId"]) ||
            !isset($data["title"]) ||
            !isset($data["stars"]) ||
            !isset($data["description"]) ||
            !isset($data["review"])
        ) {

            echo json_encode([
                "success" => false,
                "message" => "Missing movie fields"
            ]);

            exit;
        }


        $movieReviewId =
            (int) $data["movieReviewId"];

        $title =
            $data["title"];

        $stars =
            (int) $data["stars"];

        $description =
            $data["description"];

        $review =
            $data["review"];


        $stmt = $conn->prepare(
            "UPDATE movieReview
             SET title = ?,
                 stars = ?,
                 description = ?,
                 review = ?
             WHERE movieReviewId = ?"
        );


        if (!$stmt) {

            echo json_encode([
                "success" => false,
                "message" => $conn->error
            ]);

            exit;
        }


        $stmt->bind_param(
            "sissi",
            $title,
            $stars,
            $description,
            $review,
            $movieReviewId
        );


        if (!$stmt->execute()) {

            echo json_encode([
                "success" => false,
                "message" => $stmt->error
            ]);

            exit;
        }


        echo json_encode([
            "success" => true,
            "message" => "Movie review updated"
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
