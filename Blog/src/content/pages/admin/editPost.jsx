import { useEffect, useState } from "react"

export function EditPost() {
    const [category, setCategory] = useState("");

    return (
        <article className="main-edit">
            <form>
                <label>
                    <select value={category} onChange={(e) => setCategory((e).target.value)}>
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
                <MovieEdit/>
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
        <article>
            <form>
                <select value={id} onChange={(e) => setId((e).target.value)}>
                    <option>
                        Choose an Post
                    </option>
                    {news.map((item) => (
                        <option key={item.News_ID} value={item.News_ID}>
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

    return (
        <article>
            {news.map((item, index) => (
                <article key={item.News_ID}>
                    <label>
                        <h3>Title</h3>
                        <input
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

                    <label>
                        <h3>Description</h3>
                        <textarea
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

                    <label>
                        <h3>Text</h3>
                        <textarea
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

                    <button
                        type="button"
                        onClick={() => handleUpdate(item)}
                    >
                        Change
                    </button>
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
        <article>
            <form>
                <select value={id} onChange={(e) => setId((e).target.value)}>
                    <option>
                        Choose an Post
                    </option>
                    {movie.map((item) => (
                        <option key={item.MovieReview_ID} value={item.MovieReview_ID}>
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

    return (
        <article>
            {movie.map((item, index) => (
                <article key={item.MovieReview_ID}>
                    <label>
                        <h3>Title</h3>
                        <input
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

                    <label>
                        <h3>Rating</h3>
                        <input type="number" max= "5"
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
                    <label>
                        <h3>Description</h3>
                        <textarea
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

                    <label>
                        <h3>Text</h3>
                        <textarea
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

                    <button
                        type="button"
                        onClick={() => handleUpdate(item)}
                    >
                        Change
                    </button>
                </article>
            ))}
        </article>
    );
}