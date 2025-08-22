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
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-wite p-2 ">
        📚 Issues List
      </h2>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Book Name</th>
            <th>Issue Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <tr key={issue.id} className="issue-row">
                <td>{issue.id}</td>
                <td>{issue.memberName}</td>
                <td>{issue.bookName}</td>
                <td>{issue.issueDate}</td>
                <td>{issue.dueDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
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
