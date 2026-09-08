import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function BookPost(){
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost/blog/backend/bookPost.php?id=${id}`)
        .then( res => res.json())
        .then( data => {
            setBook(data);
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

    if (!book) {
        return <p>Book not found</p>;
    }
    return(
        <main>
            <h2>{book.title}</h2>
            <p>{book.Review}</p>
        </main>
    )
}