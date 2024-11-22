import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserList from "./components/UserManagement/UserList";
import RoleList from "./components/RoleManagement/RoleList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Main Content */}
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Admin Dashboard</h1>

        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand text-primary fw-bold" to="/">
              Dashboard
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Manage Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/roles">
                    Manage Roles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routing Section */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h2 className="text-tertiary mb-4">Welcome to the Admin Dashboard!</h2>
                <p className="lead text-dark">ONE STOP SOLUTION FOR ALL OF YOUR ADMIN NEEDS</p>
                <p className="text-muted" style={{ color: '#6c757d' }}>Use the navigation bar above to manage users and roles</p>
              </div>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
        </Routes>

        {/* Conditionally render About Section */}
        {location.pathname === "/" && (
          <section className="about-section text-center my-5 py-5" style={{ backgroundColor: "#e9ecef", borderRadius: "8px", padding: "30px" }}>
            <h2 className="text-primary mb-3">About Us</h2>
            <Row className="justify-content-center">
              <Col md={6} className="mb-4">
              <img
              src="https://cdn-icons-png.flaticon.com/512/10061/10061684.png"
              alt="About Us"
              className="img-fluid rounded shadow about-us-image"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
              </Col>
              <Col md={6}>
                <p className="lead text-dark text-left">
                  The Admin Dashboard is designed to manage users and roles easily and securely. It is user-friendly, efficient, and helps streamline your administrative tasks with ease. Our aim is to provide a one-stop solution for managing and organizing your users and roles.
                </p>
                <Button 
                  variant="primary" 
                  className="mt-3"
                  onClick={() => window.open('https://youtu.be/YI9RTtoNXgQ', '_blank')}
                  >
                  Learn More
                </Button>

              </Col>
            </Row>
          </section>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Admin Dashboard. All Rights Reserved.</p>
        <p>Made with &hearts; by Parinika Kath</p>
        <div>
          <a href="https://github.com/theparinikakath" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://www.youtube.com/@AnonymousGirl072" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a href="https://www.instagram.com/theparinikakath" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.linkedin.com/in/parinikakath/" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
