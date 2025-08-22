import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


function Books() {
    const [showbooks, setshowbooks] = useState([]);

    const BooksData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/books");
            setshowbooks(res.data);
        } catch (error) {
            console.log("Server-Down");
        }
    };

    useEffect(() => {
        BooksData();
    }, []);

    return (
        <div className="books-wrap">
            <header className="books-header">
                <h1>Library Books</h1>
            </header>

            <div className="books-grid">
                {showbooks.map((data) => (
                    <article key={data?.id} className="book-card">

                        <div className="book-body">
                            <span className="badge-genre">{data.genre}</span>
                            <h2 className="book-title">{data.title}</h2>

                            <div className="book-meta">
                                <span className="book-author">by {data.author}</span>
                                <br />
                            </div>

                            <div className="book-footer">
                                <div className="rent">
                                    <span>Rent
                                        ₹<strong> {data.rent}</strong>
                                    </span>
                                </div>
                                <Button className="btn-view" variant="primary">View</Button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Books;

