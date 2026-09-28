import { useEffect, useState } from "react";

export function EditPost() {
    const [category, setCategory] = useState("");

    return (
        <article className="edit-post">
            <form className="edit-post__category-form">
                <label className="edit-post__category-label">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="edit-post__category-select"
                    >
                        <option value="">Choose an option</option>
                        <option value="news">News</option>
                        <option value="bookReview">Book Review</option>
                        <option value="movieReview">Movie Review</option>
                    </select>
                </label>
            </form>

            {category === "news" && <NewsEdit />}
            {category === "bookReview" && <BooksEdit />}
            {category === "movieReview" && <MovieEdit />}
        </article>
    );
}


/* =========================================================
   NEWS
========================================================= */

function NewsEdit() {
    const [news, setNews] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/postsLoad.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news"
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("News list:", data);
                setNews(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                >
                    <option value="">Choose a Post</option>

                    {news.map((item) => (
                        <option
                            key={item.newsId}
                            value={item.newsId}
                            className="form-edit__option"
                        >
                            {item.title}
                        </option>
                    ))}
                </select>
            </form>

            {id && <LoadNewsId newsId={id} />}
        </article>
    );
}


function LoadNewsId({ newsId }) {
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetch("http://localhost/api/postsLoad.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news",
                newsId: newsId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Selected news:", data);

                // Als PHP een array teruggeeft met één item
                if (Array.isArray(data)) {
                    setNews(data[0] || null);
                } else {
                    setNews(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [newsId]);

    function handleChange(field, value) {
        setNews((previous) => ({
            ...previous,
            [field]: value
        }));
    }

    function handleUpdate() {
        fetch("http://localhost/api/editPost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news",
                newsId: news.newsId,
                title: news.title,
                description: news.description,
                text: news.text
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Updated:", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDelete() {
        fetch("http://localhost/api/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news",
                newsId: news.newsId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted:", data);
                setNews(null);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!news) {
        return <p>Loading...</p>;
    }

    return (
        <article className="form-editor__item">

            <label className="form-editor___field">
                <h3 className="form-editor__label">Title</h3>

                <input
                    className="form-editor__input"
                    type="text"
                    value={news.title || ""}
                    onChange={(e) =>
                        handleChange("title", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">
                    Description
                </h3>

                <textarea
                    className="form_editor__textarea"
                    value={news.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Text</h3>

                <textarea
                    className="form_editor__textarea"
                    value={news.text || ""}
                    onChange={(e) =>
                        handleChange("text", e.target.value)
                    }
                />
            </label>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleUpdate}
            >
                Change
            </button>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleDelete}
            >
                Delete
            </button>

        </article>
    );
}


/* =========================================================
   BOOKS
========================================================= */

function BooksEdit() {
    const [books, setBooks] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/booksLoad.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "bookReview"
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Books list:", data);
                setBooks(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                >
                    <option value="">Choose a Post</option>

                    {books.map((item) => (
                        <option
                            key={item.BookReview_ID}
                            value={item.BookReview_ID}
                            className="form-edit__option"
                        >
                            {item.Title}
                        </option>
                    ))}
                </select>
            </form>

            {id && <LoadBookId bookId={id} />}
        </article>
    );
}


function LoadBookId({ bookId }) {
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost/blog/backend/loadIdPost.php?bookId=${bookId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: "bookReview"
                })
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("Selected book:", data);

                if (Array.isArray(data)) {
                    setBook(data[0] || null);
                } else {
                    setBook(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [bookId]);

    function handleChange(field, value) {
        setBook((previous) => ({
            ...previous,
            [field]: value
        }));
    }

    function handleUpdate() {
        fetch("http://localhost/blog/backend/changePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "bookReview",
                BookReview_ID: book.BookReview_ID,
                title: book.Title,
                author: book.Author,
                stars: book.Stars,
                description: book.Description,
                review: book.Review
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Updated:", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDelete() {
        fetch("http://localhost/blog/backend/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "bookReview",
                BookReview_ID: book.BookReview_ID
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted:", data);
                setBook(null);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <article className="form-editor__item">

            <label className="form-editor___field">
                <h3 className="form-editor__label">Title</h3>

                <input
                    className="form-editor__input"
                    type="text"
                    value={book.Title || ""}
                    onChange={(e) =>
                        handleChange("Title", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Author</h3>

                <input
                    className="form-editor__input"
                    type="text"
                    value={book.Author || ""}
                    onChange={(e) =>
                        handleChange("Author", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Rating</h3>

                <input
                    className="form-editor__input"
                    type="number"
                    min="0"
                    max="5"
                    value={book.Stars || ""}
                    onChange={(e) =>
                        handleChange("Stars", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">
                    Description
                </h3>

                <textarea
                    className="form_editor__textarea"
                    value={book.Description || ""}
                    onChange={(e) =>
                        handleChange("Description", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Review</h3>

                <textarea
                    className="form_editor__textarea"
                    value={book.Review || ""}
                    onChange={(e) =>
                        handleChange("Review", e.target.value)
                    }
                />
            </label>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleUpdate}
            >
                Change
            </button>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleDelete}
            >
                Delete
            </button>

        </article>
    );
}


/* =========================================================
   MOVIES
========================================================= */

function MovieEdit() {
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/movieLoad.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "movieReview"
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Movies list:", data);
                setMovies(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                >
                    <option value="">Choose a Post</option>

                    {movies.map((item) => (
                        <option
                            key={item.MovieReview_ID}
                            value={item.MovieReview_ID}
                            className="form-edit__option"
                        >
                            {item.Title}
                        </option>
                    ))}
                </select>
            </form>

            {id && <LoadMovieId movieId={id} />}
        </article>
    );
}


function LoadMovieId({ movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost/blog/backend/loadIdPost.php?movieId=${movieId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: "movieReview"
                })
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("Selected movie:", data);

                if (Array.isArray(data)) {
                    setMovie(data[0] || null);
                } else {
                    setMovie(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [movieId]);

    function handleChange(field, value) {
        setMovie((previous) => ({
            ...previous,
            [field]: value
        }));
    }

    function handleUpdate() {
        fetch("http://localhost/blog/backend/changePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "movieReview",
                MovieReview_ID: movie.MovieReview_ID,
                title: movie.Title,
                stars: movie.Stars,
                description: movie.Description,
                review: movie.Review
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Updated:", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDelete() {
        fetch("http://localhost/blog/backend/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "movieReview",
                MovieReview_ID: movie.MovieReview_ID
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted:", data);
                setMovie(null);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <article className="form-editor__item">

            <label className="form-editor___field">
                <h3 className="form-editor__label">Title</h3>

                <input
                    className="form-editor__input"
                    type="text"
                    value={movie.Title || ""}
                    onChange={(e) =>
                        handleChange("Title", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Rating</h3>

                <input
                    className="form-editor__input"
                    type="number"
                    min="0"
                    max="5"
                    value={movie.Stars || ""}
                    onChange={(e) =>
                        handleChange("Stars", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">
                    Description
                </h3>

                <textarea
                    className="form_editor__textarea"
                    value={movie.Description || ""}
                    onChange={(e) =>
                        handleChange("Description", e.target.value)
                    }
                />
            </label>

            <label className="form-editor___field">
                <h3 className="form-editor__label">Review</h3>

                <textarea
                    className="form_editor__textarea"
                    value={movie.Review || ""}
                    onChange={(e) =>
                        handleChange("Review", e.target.value)
                    }
                />
            </label>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleUpdate}
            >
                Change
            </button>

            <button
                className="form-editor__button"
                type="button"
                onClick={handleDelete}
            >
                Delete
            </button>

        </article>
    );
}