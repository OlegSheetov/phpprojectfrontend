import React , {useState} from "react";
import useRef from "react";
import "./RegistrationComponent.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RegistrationComponent() {
    let [email , setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [description, setDescription] = useState('');


    return (
        <Container className="RegistrationComponent">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password again"
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as='textarea'
                                maxlength='255'
                                placeholder="Description"
                                className="RegistrationComponent_Description"
                            />
                            <Form.Label>*225 Symbols maximum</Form.Label>
                        </Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Remember me"
                            className="mb-3"
                        />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
        </Container>
    );
}
