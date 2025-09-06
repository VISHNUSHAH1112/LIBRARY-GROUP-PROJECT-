import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Description() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/books/${id}`);
                setBook(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) return <h2 className="text-center text-white mt-5">Loading...</h2>;

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-4" style={{ backgroundColor: "#F7F4EA" }}>
            <div
                className="row w-100 justify-content-center"
            >
                <div
                    className="col-12 col-md-10 col-lg-8 p-4 rounded-4"
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#eef0ff",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    <div className="row g-4 align-items-center">
                        {/* Image */}
                        <div className="col-12 col-md-5 position-relative">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="img-fluid rounded-3 shadow"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    objectFit: "cover"
                                }}
                            />

                            <div
                                className="position-absolute top-0 start-0 mt-2 ms-2 px-3 py-1 rounded-pill fw-bold text-white"
                                style={{
                                    background: "linear-gradient(135deg, #e44a4aff, #000000ff)",
                                    boxShadow: "0 8px 24px rgba(106,92,255,0.4)"
                                }}
                            >
                                Rent: {book.rent}
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="col-12 col-md-7 d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="border border-dashed px-2 py-1 rounded-pill text-secondary fw-bold">
                                    Book ID: {book.id}
                                </span>

                                <button
                                    onClick={() => navigate(-1)}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="btn"
                                    style={{
                                        borderRadius: "12px",
                                        border: "1px solid rgba(0,0,0,0.12)",
                                        background: isHovered ? "red" : "rgba(255,255,255,0.1)",
                                        color: isHovered ? "white" : "black",
                                        padding: "8px 14px",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    ← Back
                                </button>
                            </div>

                            <h2 className="mb-1" style={{ fontSize: "clamp(26px, 3.4vw, 40px)", color: "#A79277" }}>
                                {book.title}
                            </h2>
                            <h4 className="fw-bold mb-2" style={{ color: "#A79277" }}>{book.author}</h4>
                            <p className="mb-0" style={{ color: "#A79277", fontSize: "18px", lineHeight: 1.7 }}>{book.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
