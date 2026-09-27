CREATE TABLE user(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin Boolean DEFAULT 1
);

CREATE TABLE news(
    newsId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    text TEXT NOT NULL
);

CREATE TABLE bookReview (
    bookReviewId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    author VARCHAR(255) NOT NULL
);

CREATE TABLE movieReview (
    movieReviewId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    review TEXT NOT NULL
);