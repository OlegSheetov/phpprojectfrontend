import React , {useState} from 'react';
import './LoginComponent.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export default function LoginComponent(){ 
    const [login , setLogin] = useState('');
    const [password , setPassword] = useState('');

    function loginHandler(e){ 


    }
    return(
        <Container className='LoginComponent'>
                <Card className='LoginComponent_Form'>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={loginHandler}>
                            <Form.Control className='mb-3' type='email' placeholder='Login' onChange={(e)=>{ setLogin(e.target.value) }}/>
                            <Form.Control  className='mb-3' type='password' placeholder='password' onChange={(e)=>{ setPassword(e.target.value) }}/>
                            <Button type='submit'>Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    )
}

