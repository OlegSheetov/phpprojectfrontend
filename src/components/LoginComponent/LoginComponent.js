import React , {useState , useRef , useEffect} from 'react';
import './LoginComponent.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Cookie from 'js-cookie';
import {useNavigate} from 'react-router-dom';


export default function LoginComponent(props){ 
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

    const Navigate = useNavigate();



    function NavigateAndReRender(){
        props.ReRender();
        Navigate('/')
    }

    function loginHandler(e){ 
        LoginFormValidation();
        //if(FormValid == true) { 
        if(LoginFormValidation()){
           let payload = new FormData(); 
            payload.append('__method' , 'Login' )
            payload.append('name' , name.trim());
            payload.append('login' , login.trim());
            payload.append('password', password.trim());
            fetch(
                "http://localhost:80/.backend/index.php",
                {method: "POST" , body:payload}
            )
              .then(response => response.text())
                .then(result => JSON.parse(result) )
              .then(json =>{
                       if(json.user_exists == true){
                           Cookie.set(
                              'name' ,
                               name ,
                               {secure: true , samesite: 'strict'}
                           );
                           Cookie.set(
                              'login' ,
                               login ,
                               {secure: true , samesite: 'strict'}
                           );
                           Cookie.set(
                              'password' ,
                               password ,
                               {secure: true , samesite: 'strict'}
                           );
                           Cookie.set(
                               'description', 
                               json.UserData.description,
                               {secure: true , samesite: 'strict'}
                           );
                           Cookie.set(
                                'MBTITYPE',
                               json.UserData.mbtitype, 
                               {secure: true , samesite: 'strict'}
                           );
                           Cookie.set(
                                'ID',
                               json.UserData.id, 
                               {secure: true , samesite: 'strict'}
                           );
                           NavigateAndReRender();
                       }else{ 
                           alert('User not found. Change something and try again.')
                       }
                       
                   } 
               )
              .catch(error => console.log('error', error));
        }

    }


    useEffect (()=>{
        if(document.cookie.includes('name'&&'login'&&'password')){
            NameRef.current.value = Cookie.get('name');
            LoginRef.current.value = Cookie.get('login');
            PasswordRef.current.value = Cookie.get('password');
            setName(Cookie.get('name'));
            setLogin(Cookie.get('login'));
            setPassword(Cookie.get('password'));
        }
    } , [])


    function LoginFormValidation(){ 
        if(!LoginRef.current.value == true && !PasswordRef.current.value == true
            && !NameRef.current.value == true) { 
            setFormValid(false);
            setLoginValid(!LoginRef.current.value)
            setPasswordValid(!PasswordRef.current.value)
            setNameValid(!NameRef.current.value)
            return false 
        }else{ 
            setFormValid(true);
            return true
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
                                    setName(NameRef.current.value);
                                    setNameValid(!NameRef.current.value);
                                    LoginRef.current.value = `@${NameRef.current.value}Login`;
                                    setLogin(LoginRef.current.value);
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

