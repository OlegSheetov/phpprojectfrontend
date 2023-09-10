import React , { useEffect , useRef , useState }from 'react';
import './AccountSettings.css'
import Cookie from 'js-cookie'
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Stack} from 'react-bootstrap'
import {ButtonGroup} from 'react-bootstrap'


function Exit() { 
    if(confirm('Are you sure?')== true){ 
        Cookie.remove('name');
        Cookie.remove('password');
        Cookie.remove('login');
        Cookie.remove('description');
    }
}



export default function AccountSettings(){ 

    let [Name , setName] = useState('');
    let [Login , setLogin] = useState('');
    let [Password , setPassword] = useState('');
    let [Description , setDescription] = useState('');


    const NameRef = useRef();
    const LoginRef = useRef();
    const PasswordRef = useRef();

     function Change() { 
        if(confirm('Are you sure?') == true){
               let payload = new FormData(); 
                payload.append('__method' , 'UpdateUser' )
                payload.append('name' , Name);
                payload.append('login' , Login);
                payload.append('password', Password);
                payload.append('description', Description);
                fetch( "http://localhost:80/backend/index.php", 
                    { method: "POST" , body:payload })
                    .then((response)=>{response.text()})
                    .then(result =>console.log(result))
                    .catch(error => console.log('error', error)); 
        }
    }   const DescriptionRef = useRef();


    useEffect(()=>{
       let payload = new FormData(); 
        payload.append('__method' , 'GetOneUser' )
        payload.append('name' , Cookie.get('name'));
        payload.append('login' , Cookie.get('login'));
        fetch( "http://localhost:80/backend/index.php", 
            { method: "POST" , body:payload })
            .then((response)=>{response.text()})
            .then(result =>console.log(result))
            .catch(error => console.log('error', error)); 


        NameRef.current.value = Cookie.get('name');
        LoginRef.current.value = Cookie.get('login');
        PasswordRef.current.value = Cookie.get('password');
        DescriptionRef.current.value = Cookie.get('description');
        setName(Cookie.get('name'));
        setLogin(Cookie.get('login'));
        setPassword(Cookie.get('password'));
        setDescription(Cookie.get('description'));
    }, [])



    return(
        <>
            <div className='AccountSettings'>
                <Stack gap={3}>
                    <Form className='mt-5'>
                        <Form.Group>
                            <Form.Text>Name:</Form.Text> 
                            <Form.Control 
                                type='text'
                                ref={NameRef}
                                onChange={()=>{
                                    setName(NameRef.current.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>Login:</Form.Text> 
                            <Form.Control
                                type='text'
                                ref={LoginRef}
                                onChange={()=>{
                                    setLogin(LoginRef.current.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>Password:</Form.Text> 
                            <Form.Control 
                                type='text'
                                ref={PasswordRef}
                                onChange={()=>{
                                    setPassword(PasswordRef.current.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>Description:</Form.Text> 
                            <Form.Control 
                                as='textarea'
                                ref={DescriptionRef}
                                onChange={()=>{
                                    setDescription(DescriptionRef.current.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <ButtonGroup>
                        <Button variant='warning' onClick={Exit}>Exit</Button>
                        <Button variant='danger'>Delete Account</Button>
                        <Button variant='success' onClick={Change}>Change</Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </>
    )
}

