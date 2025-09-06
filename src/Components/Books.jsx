import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { FetchData, AddBooks, DeleteData } from "../Slice/BooksSlice";

function Books() {
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", rent: "" });

    const { books, status, error } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const { isLoggedIn, role, showToast, requireLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(FetchData());
    }, [dispatch]);

    const handleChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    const handleAddBook = () => {
        const { title, author, genre, rent } = newBook;
        if (!title || !author || !genre || !rent) {
            return showToast("warn", "⚠️ Please fill all fields!");
        }

        dispatch(AddBooks({ ...newBook, id: Date.now() }));
        setShowModal(false);
        setNewBook({ title: "", author: "", genre: "", rent: "" });
        showToast("info", "📘 Book added successfully!");
    };

    const deleteBook = (id) => {
        dispatch(DeleteData(id));
        showToast("error", "❌ Book deleted!");
    };

    return (
        <div className="books-wrap" style={{
            backgroundColor: "#F7F4EA",
            padding: "20px"
        }}>
            <header className="books-header d-flex justify-content-between align-items-center">
                <h1 style={{ color: "#B87C4C" }}>Library Books</h1>
                {isLoggedIn && role === "admin" && (
                    <Button variant="success" onClick={() => setShowModal(true)}>
                        + Add Book
                    </Button>
                )}
            </header>

            {status === "loading" && <p>⏳ Loading books...</p>}
            {status === "error" && <p style={{ color: "red" }}>❌ {error}</p>}

            <div className="books-grid" >
                {books.map((data) => (
                    <article key={data.id} className="book-card" style={{ backgroundColor: "#EAD7BB" }}>
                        <div className="book-body">
                            <span className="badge-genre">{data.genre}</span>
                            <h2 className="book-title">{data.title}</h2>
                            <p className="book-author">by {data.author}</p>

                            <div className="book-footer d-flex justify-content-between align-items-center">
                                <span>Rent ₹<strong>{data.rent}</strong></span>

                                <div className="d-flex gap-2">
                                    <Button
                                        style={{ backgroundColor: "#B87C4C", border: "none" }}
                                        variant="primary"
                                        onClick={() => {
                                            if (requireLogin()) {
                                                showToast("success", `✅ Opening ${data.title}`);
                                                navigate(`/Description/${data.id}`);
                                            }
                                        }}
                                    >
                                        View
                                    </Button>

                                    {isLoggedIn && role === "admin" && (
                                        <Button variant="danger" onClick={() => deleteBook(data.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {showModal && isLoggedIn && role === "admin" && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-center">
                            <h4 style={{ color: "black" }}>Add New Book</h4>
                            <button className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>

                        <div className="modal-body">
                            <Form>
                                {["title", "author", "genre", "rent"].map((field) => (
                                    <Form.Group className="mb-3" key={field}>
                                        <Form.Label style={{ color: "black" }}>
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </Form.Label>
                                        <Form.Control
                                            type={field === "rent" ? "number" : "text"}
                                            placeholder={`Enter ${field}`}
                                            name={field}
                                            value={newBook[field]}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                ))}
                            </Form>
                        </div>

                        <div className="modal-footer d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button variant="success" onClick={handleAddBook}>Save Book</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Books;
