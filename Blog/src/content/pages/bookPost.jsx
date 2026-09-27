import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function BookPost() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost/api/postsLoad.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify ({
                category: "bookReview",
                id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                setBook(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>Book not found</p>;
    }
    return (
        <main>
            <section className="header">
                <h1>Book Review</h1>
                <article className="header-info">
                    <h2>About</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat voluptates voluptatem repudiandae aspernatur a quam debitis repellendus dolor, repellat sapiente magni, magnam inventore quis facilis excepturi autem sed omnis optio!</p>
                </article>
            </section>
            <section className="main-content">
                <article className="main-content-card">
                    <div className="main-content-card-header">
                        <h2>{book.title}</h2>
                        <h2>{book.stars} / 5</h2>
                    </div>
                    <div>
                    <p>{book.review}</p>
                    <h3>{book.author}</h3>
                    </div>
                </article>
            </section>
        </main>
    )
}