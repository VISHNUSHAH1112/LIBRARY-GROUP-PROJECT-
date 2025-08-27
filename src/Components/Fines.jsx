import { useEffect, useState } from "react";

export default function Fines() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/fines")
      .then((res) => res.json())
      .then((data) => setFines(data))
      .catch((err) => console.error("Error fetching fines:", err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#0d6efd",
          color: "white",
          borderRadius: "8px",
        }}
      >
        💰 Fines Records
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            textAlign: "left",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Member Name</th>
            <th style={{ padding: "12px" }}>Book Name</th>
            <th style={{ padding: "12px" }}>Due Date</th>
            <th style={{ padding: "12px" }}>Return Date</th>
            <th style={{ padding: "12px" }}>Fine Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {fines.length > 0 ? (
            fines.map((fine) => (
              <tr
                key={fine.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  transition: "background 0.3s",
                  color: "black", // text black hi rahega
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1389ffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "orange")
                }
              >
                <td style={{ padding: "10px" }}>{fine.id}</td>
                <td style={{ padding: "10px" }}>{fine.memberName}</td>
                <td style={{ padding: "10px" }}>{fine.bookName}</td>
                <td style={{ padding: "10px" }}>{fine.dueDate}</td>
                <td style={{ padding: "10px" }}>{fine.returnDate}</td>
                <td style={{ padding: "10px" }}>{fine.fineAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "15px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                No fines found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
