import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoLibrary } from "react-icons/io5";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./AuthContext";

function LibraryNavbar() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, role, login, logout } = useAuth();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const msg = login(username, password);

    setUsername("");
    setPassword("");
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();

  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#A8BBA3" }}>
        <Container>
          <div style={{ color: "white" }}>
            <IoLibrary style={{ fontSize: "24px" }} /> Library
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {isLoggedIn && (<Button
              variant=""
              style={{ border: "none", fontSize: "20px" }}
              disabled={location.pathname === "/"}
              onClick={() => navigate("/")}
            >
              Library
            </Button>)}

            {!isLoggedIn && (
              <Button
                variant="outline-light"
                onClick={() => setShowModal(true)}
                role="null"
              >
                Login
              </Button>
            )}

            {isLoggedIn && role === "admin" && (
              <Dropdown

              >
                <Dropdown.Toggle variant="" id="dropdown-basic" style={{ border: "none", fontSize: "20px" }} >
                  Records
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/Issues" style={{ border: "none", fontSize: "20px" }}>
                    Issues
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/Fines" style={{ border: "none", fontSize: "20px" }}>
                    Fines
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {isLoggedIn && role === "admin" && (
              <Button
                style={{ border: "none", fontSize: "20px" }}
                variant=""
                as={NavLink}
                to={"/Members"}
              >
                Members
              </Button>
            )}

            {isLoggedIn && (
              <Button variant="danger" onClick={handleLogout}  >
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username (Admin / User)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LibraryNavbar;
