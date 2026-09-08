import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Books() {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/booksLoad.php")
            .then(res => res.json())
            .then(data => {
                setBook(data.slice(0, 4));
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    })
    return (
        <main>
            <section className="header">
                <h1>Book Reviews</h1>
                <article className="header-info">
                    <h2>About : </h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptas ratione repellendus beatae voluptates velit tempore similique fugiat reiciendis amet, cumque expedita minus autem animi obcaecati laboriosam, ducimus eaque aperiam.</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">Book Reviews: </h2>
                {book.map((item) => (
                    <article className="main-content-card">
                        <h2>{item.title}</h2>
                        <div key={item.BookReview_ID}>
                            <p className="Description">{item.Description}</p>
                            <Link to={`/books/${item.BookReview_ID}`}>
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}