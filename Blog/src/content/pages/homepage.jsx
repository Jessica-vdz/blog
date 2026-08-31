import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';


export function Homepage() {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        fetch("http://localhost/blog/backend/loadLatest.php")
            .then(res => res.json())
            .then(data => {
                setLatest(data.slice(0,4));
            })
            .catch(err => {
                console.log(err);

            });

    })
    return (
        <main className="">
            <header className="header">
                <h1 className="">Jessica vd Zwaag</h1>
                <article className="header-info">
                    <h2 className="">about me</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, nostrum minima magni quo dolor repellat suscipit veniam aspernatur ducimus, doloremque odio voluptatem culpa esse laborum numquam maiores expedita autem et?</p>
                </article>
            </header>
            <section className="main-content">
                <h2 className="main-content-header">Latest:</h2>
                {latest.map((latest) => (
                    <article key={latest.Latest_ID} className="main-content-card">
                        <h2>{latest.Title}</h2>
                        <div className="">
                            <p>{latest.Description}</p>
                            <button>Read More</button>
                        </div>
                    </article>
                ))}
            </section>
            <section>
            </section>
        </main>
    )
}