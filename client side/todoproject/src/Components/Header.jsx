import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Header.css'; 
function Header() {
  return (
    <Navbar expand="lg" className="bg-primary text-white shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#home" className="d-flex align-items-center text-white">
          <i className="fa-solid fa-list-check me-2" style={{ fontSize: '1.5rem' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>TODO APP</span>
        </Navbar.Brand>

        <Link to="/calendar" className="btn btn-light shadow-sm">
          View Calendar
        </Link>
      </Container>
    </Navbar>
  );
}

export default Header;
