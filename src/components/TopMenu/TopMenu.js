import React , { useState , useEffect } from 'react';
import './TopMenu.css';
import logo from './githublogo.png';
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
                 <Nav.Link
                     href='/AccountSettings'
                     className='link NameLink'
                 >
                         {userName}
                 </Nav.Link>
             </Nav>
            )
        }else{ 
            return(
                <Nav>
                    <Nav.Link href='/Registration'>
                        Регистрация
                     </Nav.Link>
                     <Nav.Link href='/Login'>
                         Вход
                     </Nav.Link>
                </Nav>
            )
        }
    }

    return(
        <div className='TopMenu'>
            <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                      <Navbar.Brand href='/'>Anquette</Navbar.Brand>
                        <Navbar.Toggle  />
                        <Navbar.Collapse >
                            {links()}
                                <Nav.Link href='/WhatIsAnquette' >
                                    Что такое Анкета ? 
                                 </Nav.Link>
                        </Navbar.Collapse>
                        <Nav.Link 
                            href='https://github.com/OlegSheetov' 
                            target='_blank'
                        >
                            <img 
                                src = {logo}
                                alt = "GitHub" 
                            />
                         </Nav.Link>
                  </Container>
                </Navbar>
        </div>
    )
}

