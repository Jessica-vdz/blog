import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    return(
        <main>
            <h1>{news.Title}</h1>
            <p>{news.Text}</p>
        </main>
    )
}