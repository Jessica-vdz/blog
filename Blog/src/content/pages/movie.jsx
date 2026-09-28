
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Movie() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/postsLoad.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                category: "movieReview"
            })
        })
            .then(res => res.json())
            .then(data => {
                setMovie(data.slice(0, 4));
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
                <h1>Movie Reviews</h1>
                <article className="header-info">
                    <h2>About: </h2>
                    <p>As a young woman, I’ve always loved watching movies. I enjoy all kinds of stories, especially fiction and fantasy, and I love discovering new characters, worlds, and adventures. Movies have always been a great way for me to escape into a different story, and I’d love to share my recommendations and opinions with others.</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">Movie Reviews: </h2>
                {movie.map((item) => (
                    <article className="main-content-card">
                        <div>
                            <h2>{item.title}</h2>
                        </div>
                        <div key={item.movieReviewId}>
                            <p className="Description">{item.description}</p>
                            <Link to={`/movie/${item.movieReviewId}`}>
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}

            </section>

        </main>
    )
}