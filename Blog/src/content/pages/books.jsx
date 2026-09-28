import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Books() {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("/php/api/postsLoad.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                category: "bookReview"
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
    }, [])
    return (
        <main className="main">
            <section className="header">
                <h1 className="headerText">Book Reviews</h1>
                <article className="header-info">
                    <h2>About : </h2>
                    <p>As a young woman, I’ve always loved reading. I especially enjoy fiction and fantasy, and I can easily get lost in a good story. Reading has always been a big part of my life, and I’d love to share my book recommendations, thoughts, and opinions with others who enjoy reading as much as I do.</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">Book Reviews: </h2>
                <div className="mainCardContainer">
                {book.map((item) => (
                    <article className="main-content-card" key={item.bookReviewId}>
                        <div>
                            <h2>{item.title}</h2>
                            <h3>{item.author}</h3>
                        </div>
                        <div key={item.bookReviewId}>
                            <p className="Description">{item.description}</p>
                            <Link to={`/books/${item.bookReviewId}`}>
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}
                </div>
            </section>
        </main>
    )
}