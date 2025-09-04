import Container from "react-bootstrap/Container";
import "../Styles/Navbar.css";
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
    login(username, password);
    setUsername("");
    setPassword("");
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar className="custom-navbar">
        <Container>
          {/* ===== Logo Section ===== */}
          <div
            className="library-logo"
            onClick={() => navigate("/")}
          >
            <IoLibrary className="library-icon" size={26} />
            <span className="library-title">Library</span>
          </div>

          {/* ===== Buttons Section ===== */}
          <div className="library-buttons">
            {isLoggedIn && (
              <button
                className="nav-btn"
                disabled={location.pathname === "/"}
                onClick={() => navigate("/")}
              >
                Library
              </button>
            )}

            {!isLoggedIn && (
              <button
                className="login-btn"
                onClick={() => setShowModal(true)}
              >
                Login
              </button>
            )}

            {isLoggedIn && role === "admin" && (
              <Dropdown>
                <Dropdown.Toggle className="records-btn">
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
            )}

            {isLoggedIn && role === "admin" && (
              <button
                className="members-btn"
                onClick={() => navigate("/Members")}
              >
                Members
              </button>
            )}

            {isLoggedIn && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* ===== Login Modal ===== */}
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
