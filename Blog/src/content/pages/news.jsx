import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
export function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        fetch("http://localhost/api/postsLoad.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        <main>
            <section className="header">
                <h1 className="headerText">Blog</h1>
                <article className="header-info">
                    <h3>About: </h3>
                    <p>Hi and welcome to my little corner of the internet! I’ve always loved getting lost in a good story, whether it’s through a book or a movie. I especially enjoy fiction and fantasy, and I love discovering new worlds, characters, and stories that stay with me long after I’ve finished them. On this blog, I’ll be sharing my honest thoughts, reviews, recommendations, and opinions on the books and movies I’ve watched and read. Whether you’re looking for your next book to read, a movie to watch, or simply want to discover something new, I hope you’ll find something here that catches your interest. So grab a cup of tea, get comfortable, and let’s discover some great stories together!</p>
                </article>
            </section>
            <section className="main-content">
                <h2 className="main-content-header">News Articles: </h2>
                <div className="main-card-container">
                    {news.map((item) => (
                        <article className="main-content-card" key={item.newsId} >
                            <h3 className="cardHeader">{item.title}</h3>
                            <div className="cardContent" >
                                <p className="Description">{item.description}</p>
                                <Link to={`/news/${item.newsId}`} >
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