

import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  Form,
  Table,
  Badge,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";

function Members() {
  const [membershow, setmembershow] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
    available: true,
  });

  // search states
  const [localSearch, setLocalSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch Members
  const BooksMember = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/members");
      setmembershow(res.data);
    } catch (error) {
      console.log("Server-Down");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    BooksMember();
  }, []);

  // ✅ Delete
  const deletarrary = async (id) => {
    await axios.delete(`http://localhost:3000/members/${id}`);
    const deletarrarys = membershow.filter((member) => member.id !== id);
    setmembershow(deletarrarys);
  };

  // ✅ Handle Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "available" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/members", formData);
      setmembershow([...membershow, res.data]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "Male",
        available: true,
      });
      setShowForm(false);
    } catch (error) {
      console.log("Error adding member");
    }
  };

  // ✅ Filtered members based on searchQuery
  const filteredMembers = membershow.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* ==== HEADER WITH SEARCH ==== */}
      <div
        className="d-flex justify-content-between align-items-center mb-3 flex-wrap"
        style={{
          gap: "15px",
          background: "whitesmoke",
          height: "70px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.35)",
          padding: "10px",
        }}
      >
        {/* Left: Heading */}
        <h2 style={{ color: "black" }}>👤 Members</h2>

        {/* Right: Search */}
        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search by Name or Email"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <Button
            onClick={() => setSearchQuery(localSearch)}
            style={{
              backgroundColor: "black",
              border: "1px solid gray",
              margin: "2px",
            }}
          >
            Search
          </Button>
        </InputGroup>
      </div>

      {/* ==== LOADING ==== */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
          <p className="mt-2">Loading members...</p>
        </div>
      )}

      {/* ==== NO MEMBERS ==== */}
      {!loading && filteredMembers.length === 0 && (
        <Alert variant="secondary">No members found.</Alert>
      )}

      {/* ==== MEMBERS TABLE ==== */}
      {filteredMembers.length > 0 && (
        <div className="table-responsive">
          <Table bordered hover striped className="align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name & Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member?.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{member?.name}</span>
                      <small className="text-muted">{member?.email}</small>
                    </div>
                  </td>
                  <td>📞 {member?.phone}</td>
                  <td>📍 {member?.address}</td>
                  <td>
                    <Badge bg="info">{member?.gender}</Badge>
                  </td>
                  <td>
                    <Badge bg={member?.available ? "success" : "secondary"}>
                      {member?.available ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletarrary(member.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

<div className="d-flex justify-content-center mt-4">
    <Button
        onClick={() => setShowForm(true)}
        style={{
            backgroundColor: "black",
            border: "2px solid gray",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            padding: "10px 25px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}
    >
        <span style={{ fontSize: "20px", fontWeight: "700" }}>+</span> Add Member
    </Button>
</div>

      {/* ==== ADD MEMBER MODAL ==== */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="available"
                value={formData.available}
                onChange={handleChange}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Add Member
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Members;
