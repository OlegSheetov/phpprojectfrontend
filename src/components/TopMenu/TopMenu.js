import React , { useState , useEffect, useRef } from 'react';
import './TopMenu.css';
import logo from './githublogo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookie from 'js-cookie';
import {Link} from 'react-router-dom';


export default function TopMenu(props){ 
    let [userName , setUserName] = useState('');
    const ThemeCheckBox = useRef();

    useEffect(()=>{
        if(document.cookie.includes('name')){
            setUserName(Cookie.get('name'));
        }
    } , [props.ReRenderValue])

    function links() { 
        if(document.cookie.includes('name')){
            return (
             <Nav>
                     <Link className='link' to='/AccountSettings' >
                         {userName}
                     </Link>
             </Nav>
            )
        }else{ 
            return(
                <Nav>
                        <Link className='link' to='/Registration'>
                            Регистрация
                        </Link>
                         <Link className='link' to='/Login'>
                             Вход
                         </Link>
                </Nav>
            )
        }
    }


    return(
        <div className='TopMenu'>
            <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                        <Nav.Link 
                            href='https://github.com/OlegSheetov' 
                            target='_blank'
                            className='GitHubLogo'
                        >
                            <img 
                                src = {logo}
                                alt = "GitHub" 
                            />
                         </Nav.Link>
                      <Navbar.Brand href='/'>Anquette</Navbar.Brand>
                       <Navbar.Toggle  />
                        <Navbar.Collapse >
                            {links()}
                            <Nav>
                                <Link  className='link' to='/SearchByType'>
                                    SearchByType
                                </Link>
                                <Link  className='link' to='/WhatIsAnquette'>
                                    Что такое Анкета ? 
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                  </Container>
                </Navbar>
        </div>
    )
}

