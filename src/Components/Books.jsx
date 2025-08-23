import { colors } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Books() {
  const [showbooks, setshowbooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    rent: "",
  });

  const BooksData = async () => {
    const res = await axios.get("http://localhost:3000/books");
    setshowbooks(res.data);
  };

  useEffect(() => {
    BooksData().catch((err) => console.log("Error fetching books:", err));
  }, []);

  // ✅ Add Book
  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.genre || !newBook.rent) {
      alert("Please fill all fields!");
      return;
    }

    const res = await axios
      .post("http://localhost:3000/books", newBook)
      .catch((err) => console.log("Error adding book:", err));

    if (res && res.data) {
      setshowbooks([...showbooks, res.data]);
      setShowModal(false);
      setNewBook({ title: "", author: "", genre: "", rent: "" });
    }
  };

  // ✅ Delete Book
  const deleteBook = async (id) => {
    await axios
      .delete(`http://localhost:3000/books/${id}`)
      .catch((err) => console.log("Error deleting book:", err));

    const updatedBooks = showbooks.filter((book) => book.id !== id);
    setshowbooks(updatedBooks);
  };

  return (
    <div className="books-wrap">
      <header className="books-header d-flex justify-content-between align-items-center">
        <h1>Library Books</h1>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Book
        </Button>
      </header>

      {/* Books Grid */}
      <div className="books-grid">
        {showbooks.map((data) => (
          <article key={data?.id} className="book-card">
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
                  <Button className="btn-view" variant="primary">
                    View
                  </Button>
                  {/* <Button
                                        className="btn-view" 
                                        variant="danger"
                                        onClick={() => deleteBook(data.id)}
                                    >
                                        Delete
                                    </Button> */}
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
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4 style={{ color: "black" }}>Add New Book</h4>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                ✖
              </button>
            </div>
            <br />
            {/* Body */}
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black" }}>Title</Form.Label>
                  <Form.Control
                    type="text"
                    style={{ border: "1px solid black" }}
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
                    style={{ border: "1px solid black" }}
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
                    style={{ border: "1px solid black" }}
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
                    style={{ border: "1px solid black" }}
                    placeholder="Enter rent price"
                    value={newBook.rent}
                    onChange={(e) =>
                      setNewBook({ ...newBook, rent: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </div>

            {/* Footer */}
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
