import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";
import { useAuth } from "./AuthContext";
import {
  Navbar,
  Container,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";

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
    if (msg) alert(msg); // show message if login returns any
    setUsername("");
    setPassword("");
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <>
      {/* Navbar */}
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          {/* Logo */}
          <div
            className="library-logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <IoLibrary className="library-icon" size={26} />
            <span className="library-title">Library</span>
          </div>

          {/* Buttons */}
          <div className="library-buttons d-flex align-items-center gap-2">
            {isLoggedIn && (
              <Button
                variant="outline-primary"
                disabled={location.pathname === "/"}
                onClick={() => navigate("/")}
              >
                Library
              </Button>
            )}

            {!isLoggedIn && (
              <Button variant="success" onClick={() => setShowModal(true)}>
                Login
              </Button>
            )}

            {isLoggedIn && role === "admin" && (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">
                    Records
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/Issues">
                      Issues
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/Fines">
                      Fines
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                  variant="info"
                  onClick={() => navigate("/Members")}
                >
                  Members
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Login Modal */}
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
