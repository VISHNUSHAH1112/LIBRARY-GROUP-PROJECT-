import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIssues, FetchIssues, DeleteIssues } from "../Slice/IssuesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Issues.css";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";

function Issues() {
  const dispatch = useDispatch();
  const { issues, loading, error } = useSelector((state) => state.issues);

  // ✅ useAuth ko call kiya
  const { showToast } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: "",
    bookName: "",
    issueDate: "",
    dueDate: "",
  });

  useEffect(() => {
    dispatch(FetchIssues());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Delete ke sath toast
  const handleDelete = (id) => {
    dispatch(DeleteIssues(id));
    showToast("error", "❌ Issue deleted!");
  };

  // ✅ Add ke sath toast
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.memberName ||
      !formData.bookName ||
      !formData.issueDate ||
      !formData.dueDate
    ) {
      showToast("warning", "⚠️ All fields are required!");
      return;
    }

    dispatch(AddIssues(formData));
    setFormData({
      memberName: "",
      bookName: "",
      issueDate: "",
      dueDate: "",
    });
    setShowForm(false);
    showToast("success", "✅ Issue added successfully!");
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
                >❌</button>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                  name="bookName"
                  placeholder="Book Name"
                  className="form-control"
                  value={formData.bookName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="issueDate"
                  placeholder="Issue Date"
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
        {loading && <p>Loading issues...</p>}
        {error && (
          <>
            <p style={{ color: "red" }}>Error: {error}</p>
            {showToast("error", `❌ ${error}`)}
          </>
        )}

        <table className="issues-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Member Name</th>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Delete Issues</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(issues) && issues.length > 0 ? (
              issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.memberName}</td>
                  <td>{issue.bookName}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(issue.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-issues">
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
