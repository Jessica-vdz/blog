import { useState } from "react"

export function Mailbot() {
    const [text, setText] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost/blog/backend/mailbot.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, text })
            });

            const data = await response.json();
            if (data.success) {
                setMessage("Send Message");
            } else {
                setMessage(data.message || "Failed to send");
            }
        } catch (error) {
            console.log(error);
        }
}
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h2>Info</h2>
                <label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />

                </label>
                <button
                    type="submit"
                    disabled={loading}>
                    {loading ? "bezig" : "versturen"}
                </button>
            </form>
        </main>
    )
}