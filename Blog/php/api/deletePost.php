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

        if (!isset($data["newsId"])) {

            echo json_encode([
                "success" => false,
                "message" => "Missing newsId"
            ]);

            exit;
        }


        $newsId = (int) $data["newsId"];


        $stmt = $conn->prepare(
            "DELETE FROM news
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
            "i",
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
            "message" => "News deleted"
        ]);

        exit;


    /* =====================================================
       BOOK REVIEW
    ===================================================== */

    case "bookReview":

        if (!isset($data["bookReviewId"])) {

            echo json_encode([
                "success" => false,
                "message" => "Missing bookReviewId"
            ]);

            exit;
        }


        $bookReviewId =
            (int) $data["bookReviewId"];


        $stmt = $conn->prepare(
            "DELETE FROM bookReview
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
            "i",
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
            "message" => "Book review deleted"
        ]);

        exit;


    /* =====================================================
       MOVIE REVIEW
    ===================================================== */

    case "movieReview":

        if (!isset($data["movieReviewId"])) {

            echo json_encode([
                "success" => false,
                "message" => "Missing movieReviewId"
            ]);

            exit;
        }


        $movieReviewId =
            (int) $data["movieReviewId"];


        $stmt = $conn->prepare(
            "DELETE FROM movieReview
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
            "i",
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
            "message" => "Movie review deleted"
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
