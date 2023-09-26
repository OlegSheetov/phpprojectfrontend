import React , { useState , useEffect } from 'react';
import './TopMenu.css'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookie from 'js-cookie';


export default function TopMenu(){ 
    let [userName , setUserName] = useState('');
    useEffect(()=>{
        if(document.cookie.includes('name')){
            setUserName(Cookie.get('name'));
        }
    } , [])

    function links() { 
        if(document.cookie.includes('name')){
            return (
             <Nav>
                 <Nav.Link >
                     <Link to='/AccountSettings' className='link NameLink'>{userName}</Link>
                 </Nav.Link>
                 <Nav.Link >
                     <Link to='/WhatIsAnquette' className='link'>Что такое Anquette?</Link>
                 </Nav.Link>
             </Nav>
            )
        }else{ 
            return(
                <Nav>
                      <Nav.Link >
                          <Link to='/Registration' className='link'>Регистрация</Link>
                     </Nav.Link>
                     <Nav.Link >
                         <Link to='/Login' className='link'>Вход</Link>
                     </Nav.Link>
                     <Nav.Link >
                         <Link to='/WhatIsAnquette' className='link'>Что такое Anquette?</Link>
                     </Nav.Link>
                </Nav>
            )
        }
    }

    return(
        <div className='TopMenu'>
            <Navbar expand="lg" className="bg-body-tertiary ">
                  <Container>
                      <Navbar.Brand><Link to='/' className='link'>Anquette</Link></Navbar.Brand>
                        <Navbar.Toggle  />
                        <Navbar.Collapse >
                            {links()}
                        </Navbar.Collapse>
                  </Container>
                </Navbar>
        </div>
    )
}

