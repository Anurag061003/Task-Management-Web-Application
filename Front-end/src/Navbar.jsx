import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutModal(false); 
    navigate("/"); 
  }

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow-lg py-3"
        style={{ background: "linear-gradient(90deg, #1a1a1a, #343a40)" }}
      >
        <Container>
          <Navbar.Brand
  onClick={() => navigate("/tasks")}
  style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.5rem" }}
>
  <span style={{ color: "#0d6efd" }}>Smart</span> &{" "}
  <span style={{ color: "#2ffca7" }}>Faster</span>{" "}
  <span style={{ color: "#0d6efd" }}>Task</span> Manager
</Navbar.Brand>


          <Navbar.Toggle aria-controls="task-navbar-nav" />
          <Navbar.Collapse id="task-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => navigate("/tasks")}
                className="text-light mx-2 nav-link-hover"
              >
                Task List
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/add/task")}
                className="text-light mx-2 nav-link-hover"
              >
                Add Task
              </Nav.Link>
            </Nav>

            {isLoggedIn && (
              <div className="d-flex align-items-center">
                <span className="text-white me-3 fw-bold">
  Welcome Back !
</span>

                <div
                  className="text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLogoutModal(true)}
                  title="Logout"
                >
                  <BiLogOut size={25} style={{ color: "white" }} />
                  <div style={{ color: "white", fontSize: "12px" }}>Logout</div>
                </div>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;  