import React from 'react';
import './TopMenu.css'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function TopMenu(){ 
    return(
        <div className='TopMenu'>
            <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                      <Navbar.Brand><Link to='/' className='link'>Anquette</Link></Navbar.Brand>
                        <Navbar.Toggle  />
                        <Navbar.Collapse >
                          <Nav className="me-auto">
                              <Nav.Link ><Link to='/Registration' className='link'>Registration</Link></Nav.Link>
                              <Nav.Link ><Link to='/Login' className='link'>Login</Link></Nav.Link>
                              <Nav.Link ><Link to='/AccountSettings' className='link'>Account Settings</Link></Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                  </Container>
                </Navbar>
        </div>
    )
}

