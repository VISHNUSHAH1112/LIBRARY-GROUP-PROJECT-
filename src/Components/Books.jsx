import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// ✅ Redux imports
import { useDispatch, useSelector } from "react-redux";
import { FetchData, AddBooks, DeleteData } from "../Slice/BooksSlice";

function Books() {
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", rent: "" });

    const { books, status, error } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const { isLoggedIn, role, showToast, requireLogin } = useAuth();
    const navigate = useNavigate();

    // ✅ Fetch books on load
    useEffect(() => {
        dispatch(FetchData());
    }, [dispatch]);

    // ✅ Handle input change
    const handleChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    // ✅ Add new book
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

    // ✅ Delete book
    const deleteBook = (id) => {
        dispatch(DeleteData(id));
        showToast("error", "❌ Book deleted!");
    };

    return (
        <Container fluid className="books-wrap py-3" style={{ backgroundColor: "#F7F4EA" }}>
            {/* ---- Header ---- */}
            <header className="books-header d-flex justify-content-between align-items-center mb-3">
                <h1 style={{ color: "#B87C4C" }}>Library Books</h1>
                {isLoggedIn && role === "admin" && (
                    <Button onClick={() => setShowModal(true)} style={{ backgroundColor: "#F7F4EA", border: "none", color: "#B17F59", fontSize: "20px" }}>
                        + Add Book
                    </Button>
                )}
            </header>

            {/* Loader & Error */}
            {status === "loading" && <p>⏳ Loading books...</p>}
            {status === "error" && <p>❌ {error}</p>}

            {/* ✅ Responsive Books Grid */}
            <Row className="g-3" >
                {books.map((data) => (
                    <Col key={data.id} xs={12} sm={6} md={4} lg={3} >
                        <article className="book-card p-3 h-100" style={{ background: "#FFC7A7", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
                            <div className="book-body">
                                <span className="badge-genre">{data.genre}</span>
                                <h2 className="book-title">{data.title}</h2>
                                <p className="book-author">by {data.author}</p>

                                <div className="book-footer d-flex justify-content-between align-items-center mt-3">
                                    <span>Rent ₹<strong>{data.rent}</strong></span>

                                    <div className="d-flex gap-2">
                                        <Button style={{ backgroundColor: "#CFAB8D", border: "none" }}
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
                                            <Button onClick={() => deleteBook(data.id)} style={{ backgroundColor: "red", border: "none" }}>
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Col>
                ))}
            </Row>

            {/* ✅ Modal */}
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
                            <Button onClick={() => setShowModal(false)}>Close</Button>
                            <Button onClick={handleAddBook}>Save Book</Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default Books;
