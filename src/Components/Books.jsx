import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "./AuthContext";  
import { useNavigate } from "react-router-dom";

function Books() {
    const [showbooks, setshowbooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        genre: "",
        rent: "",
    });

    // ✅ include showToast & requireLogin from context
    const { isLoggedIn, role, showToast, requireLogin } = useAuth();
    const navigate = useNavigate();

    // ---- Fetch books ----
    const BooksData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/books");
            setshowbooks(res.data);
        } catch (err) {
            console.log("Error fetching books:", err);
        }
    };

    useEffect(() => {
        BooksData();
    }, []);

    // ---- Add book ----
    const handleAddBook = () => {
        if (!newBook.title || !newBook.author || !newBook.genre || !newBook.rent) {
            showToast("warn", "⚠️ Please fill all fields!"); 
            return;
        }

        const addedBook = { ...newBook, id: Date.now() };
        setshowbooks([...showbooks, addedBook]);
        setShowModal(false);
        setNewBook({ title: "", author: "", genre: "", rent: "" });

        showToast("info", "📘 Book added successfully!"); 
    };

    // ---- Delete book ----
    const deleteBook = (id) => {
        const updatedBooks = showbooks.filter((book) => book.id !== id);
        setshowbooks(updatedBooks);
        showToast("error", "❌ Book deleted!"); 
    };

    return (
        <div className="books-wrap">
            <header className="books-header d-flex justify-content-between align-items-center">
                <h1>Library Books</h1>

                {isLoggedIn && role === "admin" && (
                    <Button variant="success" onClick={() => setShowModal(true)}>
                        + Add Book
                    </Button>
                )}
            </header>

            <div className="books-grid">
                {showbooks.map((data) => (
                    <article key={data.id} className="book-card">
                        <div className="book-body">
                            <span className="badge-genre">{data.genre}</span>
                            <h2 className="book-title">{data.title}</h2>
                            <div className="book-meta">
                                <span className="book-author">by {data.author}</span>
                            </div>
                            <div className="book-footer d-flex justify-content-between align-items-center">
                                <div className="rent">
                                    <span>
                                        Rent ₹<strong>{data.rent}</strong>
                                    </span>
                                </div>
                                <div className="d-flex gap-2">
                                    {/* ---- View Button ---- */}
                                    <Button
                                        className="btn-view"
                                        variant="primary"
                                        onClick={() => {
                                            if (requireLogin()) {
                                                showToast("success", `✅ Opening ${data.title}`); // 🟢 green
                                                navigate(`/Description/${data.id}`);
                                            }
                                        }}
                                    >
                                        View
                                    </Button>

                                    {/* ---- Delete Button (Admin only) ---- */}
                                    {isLoggedIn && role === "admin" && (
                                        <Button
                                            onClick={() => deleteBook(data.id)}
                                            style={{
                                                backgroundColor: "red",
                                                borderColor: "red",
                                                color: "white",
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* ---- Modal ---- */}
            {showModal && isLoggedIn && role === "admin" && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-center">
                            <h4 style={{ color: "black" }}>Add New Book</h4>
                            <button className="btn-close" onClick={() => setShowModal(false)}>
                                ✖
                            </button>
                        </div>
                        <br />

                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: "black" }}>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter book title"
                                        value={newBook.title}
                                        onChange={(e) =>
                                            setNewBook({ ...newBook, title: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: "black" }}>Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter author name"
                                        value={newBook.author}
                                        onChange={(e) =>
                                            setNewBook({ ...newBook, author: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: "black" }}>Genre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter genre"
                                        value={newBook.genre}
                                        onChange={(e) =>
                                            setNewBook({ ...newBook, genre: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: "black" }}>Rent Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter rent price"
                                        value={newBook.rent}
                                        onChange={(e) =>
                                            setNewBook({ ...newBook, rent: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        </div>

                        <div className="modal-footer d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleAddBook}>
                                Save Book
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Books;
