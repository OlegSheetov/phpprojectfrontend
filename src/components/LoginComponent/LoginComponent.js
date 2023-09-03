import React , {useState , useRef} from 'react';
import './LoginComponent.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';



export default function LoginComponent(){ 
    const [login , setLogin] = useState('');
    const [name , setName] = useState('');
    const [password , setPassword] = useState('');

    const [LoginValid, setLoginValid] = useState(false);
    const [NameValid, setNameValid] = useState(false);
    const [PasswordValid, setPasswordValid] = useState(false);
    const [FormValid, setFormValid] = useState(false);

    const LoginRef = useRef();
    const NameRef = useRef();
    const PasswordRef = useRef();

    function loginHandler(e){ 
        LoginFormValidation();
        if(FormValid == true) { 
           let payload = new FormData(); 
            payload.append('__method' , 'Login' )
            payload.append('login' , login);
            payload.append('name' , name);
            payload.append('password', password);

            fetch("localhost:80/backend/index.php", {method: "POST" , body:payload})
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
        }

    }


    function LoginFormValidation(){ 
        if(!LoginRef.current.value == true && !PasswordRef.current.value == true && !NameRef.current.value == true) { 
            setFormValid(false);
            setLoginValid(!LoginRef.current.value)
            setPasswordValid(!PasswordRef.current.value)
            setNameValid(!NameRef.current.value)
        }else{ 
            setFormValid(true);
        }
    }
    return(
        <Container className='LoginComponent'>
                <Card className='LoginComponent_Form'>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={loginHandler}>
                            <Form.Control className='mb-3' type='text' placeholder='Name' 
                                ref={NameRef}
                                isInvalid={NameValid}
                                onChange={()=>{ 
                                    setName(NameRef.current.value) 
                                    setNameValid(!NameRef.current.value)
                                    LoginRef.current.value = `@${NameRef.current.value}Login`
                            }}/>
                            <Form.Control className='mb-3' type='email' placeholder='Login' 
                                ref={LoginRef}
                                isInvalid={LoginValid}
                                onChange={()=>{ 
                                    setLogin(LoginRef.current.value) 
                                    setLoginValid(!LoginRef.current.value)
                            }}/>
                            <Form.Control   className='mb-3' type='password' placeholder='password' 
                                ref={PasswordRef}
                                isInvalid={PasswordValid}
                                onChange={()=>{
                                    setPassword(PasswordRef.current.value) 
                                    setPasswordValid(!PasswordRef.current.value)
                            }}/>
                            <Button type='button' onClick={loginHandler}>Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    )
}

