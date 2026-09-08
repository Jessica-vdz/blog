import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
export function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/blog/backend/newsLoad.php")
            .then(res => res.json())
            .then(data => {
                setNews(data.slice(0, 4));
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
                    <article className="main-content-card">
                        <h2>{item.Title}</h2>
                        <div key={item.News_ID} className="news-container">
                            <p className="Description">{item.Description}</p>
                            <Link to={`/news/${item.News_ID}`}>
                                <button className="RmButton">Read More</button>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}