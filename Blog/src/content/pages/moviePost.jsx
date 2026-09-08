import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function MoviePost() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/moviePost.php?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
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

    if (!movie) {
        return <p>movie not found1</p>;
    }
    return (
        <main>
            <section className="header">
                <h1>Movie Review</h1>
                <article className="header-info">
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dicta autem assumenda. Voluptas odit excepturi beatae magni amet maiores laudantium dolorum sapiente tempora placeat iure quae corporis, similique incidunt. Non.</p>
                </article>
            </section>
            <section className="main-content">
                <article className="main-content-card">
                    <div className="main-content-card-header">
                        <h2>{movie.Title}</h2>
                        <h4>{movie.Stars} / 5</h4>
                    </div>
                    <p>{movie.Review}</p>
                </article>

            </section>

        </main>
    )
}