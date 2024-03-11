import React , { useState }  from 'react';
import './AdminPanelLoginScreen.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Fetch from '../../../helpers/fetch.js'
import Cookie from 'js-cookie';



export default function AdminPanelLoginScreen(){ 
    const Navigate = useNavigate();

    // Form values
    let [AdminLogin, setAdminLogin] = useState("");
    let [AdminPassword, setAdminPassword] = useState("");

    //Form validation values

    let [AdminLoginValid, setAdminLoginValid] = useState("");
    let [AdminPasswordValid, setAdminPasswordValid] = useState("");

    function formValidation () { 

        if( !AdminLogin == '' && !AdminPassword == '' ){
            // Если оба поля не пусты , то возвращай  true - тоесть они не пусты
            return true

        }else{ 
            setAdminLoginValid(true)
            setAdminPasswordValid(true)
            return false
        }

    }

    function formHandler(){ 
        function onResponse(json){ 
            if(json.response == 'logged'){ 
                Cookie.set('Admin' , JSON.stringify({
                    AdminLogin: AdminLogin,
                    AdminPassword:AdminPassword
                }), 
                    {
                        secure: true ,
                        sameSite: 'Strict',
                        expires: 1
                    }
                );
                 Navigate('/AdminPanel');
            }else { 
                alert('Admin do not found!');
            }
        }
        if (formValidation()){
            Fetch(
                "POST",
                { __method: 'AdminPanelLogin',
                    AdminLogin: AdminLogin,
                    AdminPassword: AdminPassword
                }, 
                onResponse
            )

        }
    }


    return(
        <div className='AdminPanelLoginScreen'>
            <div className='AdminPanelLoginScreen_LoginForm'>
                <Form noValidate>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Login</Form.Label>
                    <Form.Control 
                        type="login"
                        placeholder="name@example.com" 
                        className="AdminPanelLoginScreen_FormController"
                        onChange={(e)=>{
                            setAdminLogin(e.target.value)
                            setAdminLoginValid(!e.target.value)
                        }}
                        isInvalid={AdminLoginValid}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="name@example.com"
                        className="AdminPanelLoginScreen_FormController"
                        onChange={(e)=>{
                            setAdminPassword(e.target.value)
                            setAdminPasswordValid(!e.target.value)
                        }}
                        isInvalid={AdminPasswordValid}
                    />
                  </Form.Group>
                  <Button 
                  onClick={formHandler}
                  variant='light'>Enter</Button>
                </Form> 
            </div>
        </div>
    )
}

