import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Movie() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/movieLoad.php")
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
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam omnis debitis perferendis reprehenderit error totam nostrum, cum rem tempora maxime earum praesentium doloribus delectus mollitia in quo aliquid voluptatum ut.</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">Movie Reviews: </h2>
                {movie.map((item) => (
                    <article className="main-content-card">
                        <h2>{item.Title}</h2>
                        <div key={item.MovieReview_ID}>
                            <p className="Description">{item.Description}</p>
                            <Link to={`/movie/${item.MovieReview_ID}`}>
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}

            </section>

        </main>
    )
}