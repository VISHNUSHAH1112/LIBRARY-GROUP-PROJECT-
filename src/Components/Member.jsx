import axios from "axios";
import { useEffect, useState } from "react";

function Members() {
    const [membershow, setmembershow] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "Male",
        available: true
    });

    const BooksMember = async () => {
        try {
            const res = await axios.get("http://localhost:3000/members");
            setmembershow(res.data);
        } catch (error) {
            console.log("Server-Down");
        }
    };

    useEffect(() => {
        BooksMember();
    }, []);

    const deletarrary = async (id) => {
        await axios.delete(`http://localhost:3000/members/${id}`);
        const deletarrarys = membershow.filter((member) => member.id !== id);
        setmembershow(deletarrarys);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "available" ? value === "true" : value
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
                available: true
            });
            setShowForm(false); 
        } catch (error) {
            console.log("Error adding member");
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3 text-white">Members</h2>

            {membershow.length === 0 && (
                <div className="alert alert-light border">No members found.</div>
            )}

            <div className="list-group">
                <div className="member-header">
                    <h5>Name</h5>
                    <h5>Email</h5>
                    <h5>Phone.No</h5>
                    <h5>Address</h5>
                </div>
                <ol>
                    {membershow.map((member) => (
                        <div
                            key={member?.id}
                            className="list-group-item member-item d-flex align-items-center justify-content-between gap-3"
                        >
                            <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                                <li></li>
                                <h5 className="mb-0 member-name">{member?.name}</h5>
                                <span className="text-muted small">•</span>
                                <span className="member-email">{member?.email}</span>
                            </div>

                            <div className="d-flex flex-wrap gap-3">
                                <span className="badge member-phone">
                                    📞 {member?.phone}
                                </span>
                                <span className="text-truncate small member-address">
                                    📍 {member?.address}
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <span className="badge text-bg-primary">{member?.gender}</span>
                                <span
                                    className={
                                        "badge " +
                                        (member?.available ? "text-bg-success" : "text-bg-secondary")
                                    }
                                >
                                    {member?.available ? "Active" : "Inactive"}
                                </span>
                                <span>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deletarrary(member.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                </ol>
            </div>

            <div className="text-center mt-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowForm(true)}
                >
                    ➕ Add Member
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">Add Member</h4>
                            <button
                                className="btn-close"
                                onClick={() => setShowForm(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                            />

                            <select
                                name="gender"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <select
                                name="available"
                                className="form-control"
                                value={formData.available}
                                onChange={handleChange}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>

                            <button type="submit" className="btn btn-success w-100">
                                Add Member
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Members;
