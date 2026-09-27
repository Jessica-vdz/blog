import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
export function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/postsLoad.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                category: "news"

            })
        })
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    })

    return (
        <main className="">
            <section className="header">
                <h1>News</h1>
                <article className="header-info">
                    <h2>About News</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nisi ipsum, veritatis nobis impedit, nihil repellendus magnam aperiam libero quidem iusto neque velit quia reiciendis tempore sint animi? Fugiat, et.</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">News Articles: </h2>
                {news.map((item) => (
                    <article className="main-content-card"  key={item.newsId} >
                        <h2>{item.title}</h2>
                        <div className="news-container" >
                            <p className="Description">{item.description}</p>
                            <Link to={`/news/${item.newsId}`} >
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}