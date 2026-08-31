import { use, useState } from "react";

export function CreatePost() {
    const [category, setCategory] = useState("");

    return (
        <article className="main-content-post">
            <form>
                <label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Choose a Category</option>
                        <option value="news">News</option>
                        <option value="story">Story</option>
                        <option value="bookReview">Book Review</option>
                    </select>
                </label>
            </form>

            {category === "news" && (
                <NewsForm />
            )}
            {category === "bookReview" && (
                <BookReview />
            )}
        </article>
    );
}

export function SendToLatest() {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const sendToLatest = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost/blog/backend/sendToLatest.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessage("Sent to latest");
            } else {
                setMessage("something went wrong.." || data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article className="main-content-post">
            <form onSubmit={sendToLatest}>
                <h2>Send to Latest</h2>
                <label className="main-content-input">
                    <h3>Title</h3>
                    <input
                        className="formInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        required />
                </label>
                <label className="main-content-input">
                    <h3>Description</h3>
                    <input
                        className="formInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <button type="submit" className="loginButton">Send</button>
            </form>
        </article>

    )
}

function NewsForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost/blog/backend/createPost.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        category: "news",
                        title: title,
                        text: text
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessage("News Posted!");
            } else {
                setMessage(data.message || "Something went wrong");
            }

        } catch (error) {
            console.log(error);
            setMessage("Something went wrong...");
        }
    };

    return (
        <article className="">
            <form onSubmit={handleSubmit}>
                <h2>News</h2>
                <label>
                    <h4>Title</h4>
                    <input
                        className="formInput"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <h4>Text</h4>
                    <textarea
                        className="formInput"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">
                    Post
                </button>

                <p>{message}</p>

            </form>
        </article>
    );
}

function BookReview() {
    const [title, setTitle] = useState("");
    const [stars, setStars] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost/blog/backend/createPost.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                category: "bookReview",
                title: title,
                stars: stars
            })
        });

        const data = await response.json();
        if (data.success) {
            setMessage("Send data Complete");
        } else {
            setMessage(data.message || "Failed");
        }
    };

    return (
        <article>
            <form onSubmit={handleSubmit}>
                <h1>Book Review</h1>
                <label>
                    <h4>Title</h4>
                    <input type="text" value={title} onChange={(e) => setTitle((e).target.value)} />
                </label>
                <label>
                    <h4>Rating</h4>
                    <input type="number" max="5" value={stars} onChange={(e) => setStars(e.target.value)} />
                </label>
                <button type="submit">Post</button>
            </form>
        </article>
    )
}