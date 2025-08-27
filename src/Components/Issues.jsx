import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
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
        📚 Issues List
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
            <th style={{ padding: "12px" }}>Issue Date</th>
            <th style={{ padding: "12px" }}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <tr
                key={issue.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  transition: "background 0.3s",
                  color: "black", // 👈 text hamesha black
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1389ffff") // 👈 hover light gray
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "orange")
                }
              >
                <td style={{ padding: "10px" }}>{issue.id}</td>
                <td style={{ padding: "10px" }}>{issue.memberName}</td>
                <td style={{ padding: "10px" }}>{issue.bookName}</td>
                <td style={{ padding: "10px" }}>{issue.issueDate}</td>
                <td style={{ padding: "10px" }}>{issue.dueDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "15px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                No issues found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Issues;
