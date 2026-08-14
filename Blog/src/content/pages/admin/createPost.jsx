import { useState } from "react"

export function CreatePost() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/blog/backend/createPost.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, title, text })
            });

            const data = await response.json();
            if (data.succes) {
                setMessage("Post Made!");
            } else {
                setMessage(data.message || "Post Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article>
            <form onSubmit={handleSubmit}>
                <label>Category
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Choose a Category</option>
                        <option value="recepten">Recepten</option>
                        <option value="verhaal">Verhaal</option>
                        <option value="nieuws">Nieuwtje</option>
                    </select>
                </label>
                <label>
                    <h3>Title</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <h3>Content</h3>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </label>
                <button type="submit">Send Post</button>
            </form>
        </article >
    )
}