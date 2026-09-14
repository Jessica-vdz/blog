import { useEffect, useState } from "react"
import { data } from "react-router-dom";

export function EditPost() {
    const [category, setCategory] = useState("");

    return (
        <article className="edit-post">
            <form className="edit-post__category-form">
                <label className="edit-post__category-label">
                    <select value={category} onChange={(e) => setCategory((e).target.value)} className="edit-post__category-select">
                        <option value="">Choose an option</option>
                        <option value="news">News</option>
                        <option value="bookReview">Book Review</option>
                        <option value="movieReview">Movie Review</option>
                    </select>
                </label>
            </form>

            {category === "news" && (
                <NewsEdit />
            )}

            {category === "bookReview" && (
                <BooksEdit />
            )}
            {category === "movieReview" && (
                <MovieEdit />
            )}
        </article>
    );
}

function NewsEdit() {
    const [news, setNews] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/newsLoad.php", {
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
                setNews(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select value={id} onChange={(e) => setId((e).target.value)}>
                    <option>
                        Choose an Post
                    </option>
                    {news.map((item) => (
                        <option key={item.News_ID} value={item.News_ID} className="form-edit__option">
                            {item.Title}
                        </option>
                    ))}
                </select>
            </form>
            {id && <LoadNewsid newsId={id} />}
        </article>
    )
}
function LoadNewsid({ newsId }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/loadIdPost.php?newsId=${newsId}`, {
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
                setNews(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [newsId]);

    function handleChange(index, field, value) {
        const updated = [...news];
        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setNews(updated);
    }

    function handleUpdate(item) {
        fetch("http://localhost/blog/backend/changePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news",
                News_ID: item.News_ID,
                title: item.Title,
                description: item.Description,
                text: item.Text
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("updated", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDelete(item) {
        fetch("http://localhost/blog/backend/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "news",
                News_ID: item.News_ID
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <article className="form-editor">
            {news.map((item, index) => (
                <article key={item.News_ID} className="form-editor__item">
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Title</h3>
                        <input
                            className="form-editor__input"
                            type="text"
                            value={item.Title}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Title",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Description</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Description}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Description",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Text</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Text}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Text",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label>
                        <button
                            className="form-editor__button"
                            type="button"
                            onClick={() => handleUpdate(item)}
                        >
                            Change
                        </button>
                        <button
                            className="form-editor__button"
                            type="button"
                            onClick={() => handleDelete(item)}>
                            Delete
                        </button>
                    </label>

                </article>
            ))}
        </article>
    );
}
//

function BooksEdit() {
    const [book, setBook] = useState([]);
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
                setBook(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select value={id} onChange={(e) => setId((e).target.value)}>
                    <option>
                        Choose an Post
                    </option>
                    {book.map((item) => (
                        <option key={item.BookReview_ID} value={item.BookReview_ID} className="form-edit__option">
                            {item.Title}
                        </option>
                    ))}
                </select>
            </form>
            {id && <LoadBookId bookId={id} />}
        </article>
    )
}
function LoadBookId({ bookId }) {
    const [book, setBook] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/loadIdPost.php?bookId=${bookId}`, {
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
                setBook(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [bookId]);

    function handleChange(index, field, value) {
        const updated = [...book];
        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setBook(updated);
    }

    function handleDelete(item) {
        fetch("http://localhost/blog/backend/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "bookReview",
                BookReview_ID: item.BookReview_ID
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleUpdate(item) {
        fetch("http://localhost/blog/backend/changePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "bookReview",
                BookReview_ID: item.BookReview_ID,
                title: item.Title,
                author: item.Author,
                stars: item.Stars,
                description: item.Description,
                review: item.Review
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("updated", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <article>
            {book.map((item, index) => (
                <article key={item.BookReview_ID} className="form-editor__item">
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Title</h3>
                        <input
                            className="form-editor__input"
                            type="text"
                            value={item.Title}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Title",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Author</h3>
                        <input type="text"
                            className="form-editor__input"
                            value={item.Author}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Author",
                                    e.target.value
                                )
                            }
                        />

                    </label>
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Rating</h3>
                        <input type="number" max="5"
                            className="form-editor__input"
                            value={item.Stars}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Stars",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Description</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Description}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Description",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Text</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Review}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Review",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label>
                        <button
                            className="form-editor__button"
                            type="button"
                            onClick={() => handleUpdate(item)}
                        >
                            Change
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="form-editor__button"
                        > Delete</button>
                    </label>

                </article>
            ))}
        </article>
    );
}
//

function MovieEdit() {
    const [movie, setMovie] = useState([]);
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
                setMovie(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <article className="form-edit">
            <form className="form-edit__select-form">
                <select value={id} onChange={(e) => setId((e).target.value)}>
                    <option>
                        Choose an Post
                    </option>
                    {movie.map((item) => (
                        <option key={item.MovieReview_ID} value={item.MovieReview_ID} className="form-edit__option">
                            {item.Title}
                        </option>
                    ))}
                </select>
            </form>
            {id && <LoadMovieId movieId={id} />}
        </article>
    )
}
function LoadMovieId({ movieId }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/loadIdPost.php?movieId=${movieId}`, {
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
                setMovie(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [movieId]);

    function handleChange(index, field, value) {
        const updated = [...movie];
        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setMovie(updated);
    }

    function handleUpdate(item) {
        fetch("http://localhost/blog/backend/changePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "movieReview",
                MovieReview_ID: item.MovieReview_ID,
                title: item.Title,
                stars: item.Stars,
                description: item.Description,
                review: item.Review
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("updated", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleDelete(item) {
        fetch("http://localhost/blog/backend/deletePost.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: "movieReview",
                MovieReview_ID: item.MovieReview_ID
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Deleted", data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <article className="form-editor">
            {movie.map((item, index) => (
                <article key={item.MovieReview_ID} className="form-editor__item">
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Title</h3>
                        <input
                            className="form-editor__input"

                            type="text"
                            value={item.Title}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Title",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Rating</h3>
                        <input type="number" max="5"
                            className="form-editor__input"
                            value={item.Stars}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Stars",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Description</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Description}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Description",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className="form-editor___field">
                        <h3 className="form-editor__label">Text</h3>
                        <textarea
                            className="form_editor__textarea"
                            value={item.Review}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "Review",
                                    e.target.value
                                )
                            }
                        />
                    </label>
                    <label>
                        <button
                            className="form-editor__button"
                            type="button"
                            onClick={() => handleUpdate(item)}
                        >
                            Change
                        </button>
                        <button
                            className="form-editor__button"
                            onClick={() => handleDelete(item)}>
                            Delete
                        </button>
                    </label>
                </article>
            ))}
        </article>
    );
}