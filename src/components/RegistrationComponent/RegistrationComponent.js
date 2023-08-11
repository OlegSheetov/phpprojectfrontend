import React from "react";
import useRef from "react";
import "./RegistrationComponent.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RegistrationComponent() {
    return (
        <Container className="RegistrationComponent">
            <Row>
                <Col>
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
                        <Form.Check
                            type="checkbox"
                            label="Remember me"
                            className="mb-3"
                        />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                className="RegistrationComponent_Description"
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
