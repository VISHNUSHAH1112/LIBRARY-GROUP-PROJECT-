import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Description() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

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

    if (!book) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                display: "grid",
                placeItems: "center",
                background:
                    "radial-gradient(1200px 600px at 10% 10%, #2a2f6b55 0%, transparent 50%)," +
                    "radial-gradient(1000px 500px at 90% 20%, #4f37ff44 0%, transparent 50%)," +
                    "linear-gradient(180deg, #0f1020, #1a1c3a)"
            }}
        >
            <div
                style={{
                    width: "min(1100px, 96vw)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "28px",
                    padding: "32px",
                    color: "#eef0ff",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    display: "grid",
                    gap: "24px",
                    gridTemplateColumns: "1fr 1.5fr"
                }}
            >
                {/* Image */}
                <div style={{ position: "relative" }}>
                    <img
                        // src={book.image}
                        src={book.image}
                        alt={book.title}
                        style={{
                            width: "100%",
                            aspectRatio: "3/4",
                            objectFit: "cover",
                            borderRadius: "22px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            boxShadow: "0 10px 35px rgba(0,0,0,0.55)"
                        }}
                    />
                    
                    <div
                        style={{
                            position: "absolute",
                            top: "14px",
                            left: "14px",
                            background: "linear-gradient(135deg, #6a5cff, #8a7bff)",
                            color: "white",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            letterSpacing: "0.3px",
                            boxShadow: "0 8px 24px rgba(106,92,255,0.4)"
                        }}
                    >
                        Rent: {book.rent}
                    </div>
                </div>

                <div style={{ display: "grid", gap: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        <span
                            style={{
                                border: "1px dashed rgba(255,255,255,0.12)",
                                color: "#aab0ff",
                                padding: "6px 10px",
                                borderRadius: "999px",
                                fontSize: "12px"
                            }}
                        >
                            Book ID: {book.id}
                        </span>
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.1)",
                                color: "#eef0ff",
                                padding: "8px 14px",
                                cursor: "pointer"
                            }}
                        >
                            ← Back
                        </button>
                    </div>

                    <h2
                        style={{
                            margin: "6px 0 0",
                            fontSize: "clamp(26px, 3.4vw, 40px)",
                            lineHeight: 1.12
                        }}
                    >
                        {book.title}
                    </h2>
                    <h4 style={{ color: "#aab0ff", fontWeight: 500, margin: "0 0 8px" }}>{book.author}</h4>

                    <p style={{ color: "#dfe2ff", opacity: 0.92, lineHeight: 1.7 }}>{book.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Description;
