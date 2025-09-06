import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchFines } from "../Slice/FineSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Fines() {
  const dispatch = useDispatch();
  const { fines } = useSelector((state) => state.fines);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: "",
    bookName: "",
    dueDate: "",
    returnDate: "",
    fineAmount: "",
  });

  useEffect(() => {
    dispatch(FetchFines());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("New Fine Data:", formData);
    // Dispatch your add fine action here
    setShowForm(false);
    setFormData({
      memberName: "",
      bookName: "",
      dueDate: "",
      returnDate: "",
      fineAmount: "",
    });
  };

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
      {/* Header with Add Fine button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            padding: "10px",
            backgroundColor: "#0d6efd",
            color: "white",
            borderRadius: "8px",
          }}
        >
          💰 Fines Records
        </h2>
        <Button
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: "#28a745", border: "none" }}
        >
          + Add Fine
        </Button>
      </div>

      {/* Fines Table */}
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
                  color: "black",
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

      {/* Add Fine Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Fine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                name="bookName"
                value={formData.bookName}
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
            <Form.Group className="mb-3">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fine Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="fineAmount"
                value={formData.fineAmount}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Add Fine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
