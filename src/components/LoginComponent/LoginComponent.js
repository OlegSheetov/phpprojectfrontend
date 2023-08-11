
import React from 'react';
import './LoginComponent.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export default function LoginComponent(){ 
    return(
        <Container className='LoginComponent'>
                <Card className='LoginComponent_Form'>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form>
                            <Form.Control className='mb-3' type='email' placeholder='Login'/>
                            <Form.Control  className='mb-3' type='password' placeholder='password'/>
                            <Button type='submit'>Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Container>
    )
}

