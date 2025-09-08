import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIssues, FetchIssues, DeleteIssues } from "../Slice/IssuesSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Table, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "./AuthContext";

function Issues() {
  const dispatch = useDispatch();
  const { issues, loading, error } = useSelector((state) => state.issues);

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

  const handleDelete = (id) => {
    dispatch(DeleteIssues(id));
    showToast("error", "❌ Issue deleted!");
  };

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
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📚 Issues List</h2>
        <Button variant="dark" onClick={() => setShowForm(true)}>
          ➕ Add New Issue
        </Button>
      </div>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
          <p className="mt-2">Loading issues...</p>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="my-3">
          ❌ {error}
        </Alert>
      )}

      <div className="table-responsive">
        <Table bordered hover striped className="align-middle text-center">
          <thead className="table-dark">
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
                      size="sm"
                      onClick={() => handleDelete(issue.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted fst-italic">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Add Issue Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                name="memberName"
                placeholder="Enter member name"
                value={formData.memberName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                name="bookName"
                placeholder="Enter book name"
                value={formData.bookName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Date</Form.Label>
              <Form.Control
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Add Issue
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Issues;
