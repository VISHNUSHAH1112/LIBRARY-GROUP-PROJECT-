import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Table, Badge, Alert, Spinner } from "react-bootstrap";

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

    return (
        <div className="container py-4">
            <h2 className="mb-3 text-dark fw-bold">👤 Members</h2>

            {loading && (
                <div className="text-center my-3">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading members...</p>
                </div>
            )}

            {!loading && membershow.length === 0 && (
                <Alert variant="secondary">No members found.</Alert>
            )}

            {membershow.length > 0 && (
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
                            {membershow.map((member, index) => (
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

            <div className="text-center mt-4">
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    ➕ Add Member
                </Button>
            </div>

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
