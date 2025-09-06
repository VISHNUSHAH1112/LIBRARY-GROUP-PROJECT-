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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#F7F4EA",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px 30px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
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
              fontSize: "22px",
              fontWeight: 600,
              color: "black",
              margin: 0,
            }}
          >
            💰 Fines Records
          </h2>
          <Button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Fine
          </Button>
        </div>

        {/* Fines Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "8px",
            overflow: "hidden",
            color: "black",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Member Name
              </th>
              <th style={{ padding: "12px", textAlign: "left" }}>Book Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Due Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Return Date
              </th>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Fine Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {fines.length > 0 ? (
              fines.map((fine) => (
                <tr
                  key={fine.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, #3d72a8, #0984e3)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "black";
                  }}
                >
                  <td style={{ padding: "12px" }}>{fine.id}</td>
                  <td style={{ padding: "12px" }}>{fine.memberName}</td>
                  <td style={{ padding: "12px" }}>{fine.bookName}</td>
                  <td style={{ padding: "12px" }}>{fine.dueDate}</td>
                  <td style={{ padding: "12px" }}>{fine.returnDate}</td>
                  <td style={{ padding: "12px" }}>{fine.fineAmount}</td>
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
          <Button
            style={{ backgroundColor: "gray", border: "none" }}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "green", border: "none" }}
            onClick={handleSubmit}
          >
            Add Fine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
