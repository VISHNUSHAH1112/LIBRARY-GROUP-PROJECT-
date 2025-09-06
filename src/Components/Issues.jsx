import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Issues.css";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: "",
    bookName: "",
    issueDate: "",
    dueDate: "",
    returnDate: "",
  });

  // Fetch issues
  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:3000/issues");
      setIssues(res.data);
    } catch (error) {
      console.log("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.memberName ||
      !formData.bookName ||
      !formData.issueDate ||
      !formData.dueDate ||
      !formData.returnDate
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/issues", formData);
      setIssues([...issues, res.data]);
      setFormData({
        memberName: "",
        bookName: "",
        issueDate: "",
        dueDate: "",
        returnDate: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log("Error adding issue:", error);
    }
  };

  return (
    <div className="issues-page">
      <div className="issues-container">
        {/* Header + Add Button */}
        <div className="issues-header">
          <h2> 📚 Issues List</h2>
          <button className="btn btn-dark" onClick={() => setShowForm(true)}>
            ➕ Add New Issue
          </button>
        </div>

        {/* Add Issue Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Add Issue</h4>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <input
                  type="text"
                  name="ID"
                  placeholder="ID"
                  className="form-control"
                  value={formData.bookName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="memberName"
                  placeholder="Member Name"
                  className="form-control"
                  value={formData.memberName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="bookname"
                  placeholder="Book Name"
                  className="form-control"
                  value={formData.bookName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="issueDate"
                  placeholder="Issue date"
                  className="form-control"
                  value={formData.issueDate}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="dueDate"
                  placeholder="Due Date"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
             
                <button type="submit" className="btn btn-success w-100">
                  Add Issue
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Issues Table */}
        <table className="issues-table">
          <thead>
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
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.memberName}</td>
                  <td>{issue.bookName}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-issues">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Issues;
