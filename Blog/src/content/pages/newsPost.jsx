import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { News } from "./news";

export function NewsPost() {
    const { id } = useParams();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/newsPost.php?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setNews(data);
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

    if (!news) {
        return <p>News article not found.</p>;

    }

    return (
        <main>
            <section className="header">
                <h1>News</h1>
                <article className="header-info">
                    <h2>About</h2>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic iusto tempore, deserunt maiores beatae, consectetur modi dolores facilis debitis minus odio. Iusto rerum suscipit voluptas fugiat quidem nisi laborum laudantium.</p>
                </article>
            </section>
            <section className="main-content">
                <article className="main-content-card">
                    <div className="main-content-card-header">
                        <h2>{news.Title}</h2>
                    </div>
                    <div>
                        <p>{news.Text}</p>
                    </div>
                </article>
            </section>
        </main>
    )
}