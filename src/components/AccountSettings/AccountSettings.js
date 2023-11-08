import React, { useEffect, useRef, useState } from "react";
import "./AccountSettings.css";
import Cookie from "js-cookie";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
    let [Name, setName] = useState("");
    let [Password, setPassword] = useState("");
    let [Description, setDescription] = useState("");

    const NameRef = useRef();
    const PasswordRef = useRef();

    const Navigate = useNavigate();

    function Exit() {
        if (confirm("Are you sure?") == true) {
            Cookie.remove("name");
            Cookie.remove("password");
            Cookie.remove("login");
            Cookie.remove("description");
            Navigate("/");
        }
    }

    function Change() {
        if (confirm("Are you sure?") == true) {
            let payload = new FormData();
            payload.append("__method", "UpdateUser");
            payload.append("name", Cookie.get("name"));
            payload.append("login", Cookie.get("login"));
            payload.append("password", Cookie.get("password"));
            payload.append("new_name", Name);
            payload.append("new_password", Password);
            payload.append("new_description", Description);
            fetch("http://localhost:80/.backend/index.php", {
                method: "POST",
                body: payload,
            })
                .then((response) => {
                    response.text();
                })
                .then((result) => {
                    console.log(result)
                })
                .then((json) => {
                    console.log(json);
                    Cookie.set("name", Name);
                    Cookie.set("password", Password);
                    Cookie.set("description", Description);
                    alert("Данные обновлены");
                })
                .catch((error) => console.log("error", error));
        }
    }

    function DeleteAccount() {
        console.log("Click Delete");
        if (confirm("Are you sure?") == true) {
            console.log("Account deleted!");
            let payload = new FormData();
            payload.append("__method", "DeleteUser");
            payload.append("name", Name);
            payload.append("login", Cookie.get("login"));
            payload.append("CheckPassword", Password);
            fetch("http://localhost:80/.backend/index.php", {
                method: "POST",
                body: payload,
            })
                .then((response) => {
                    response.text();
                })
                .then((result) => {
                    console.log(result);
                    Cookie.remove("name");
                    Cookie.remove("login");
                    Cookie.remove("password");
                    Cookie.remove("description");
                    Navigate("/");
                })
                .catch((error) => console.log("error", error));
        }
    }
    const DescriptionRef = useRef();

    useEffect(() => {
        //  let payload = new FormData();
        //   payload.append('__method' , 'GetOneUser' )
        //   payload.append('name' , Cookie.get('name'));
        //   payload.append('login' , Cookie.get('login'));
        //   fetch( "http://localhost:80/.backend/index.php",
        //       { method: "POST" , body:payload })
        //       .then((response)=>{response.text()})
        //       .then(result =>console.log(result))
        //       .catch(error => console.log('error', error));

        NameRef.current.value = Cookie.get("name");
        PasswordRef.current.value = Cookie.get("password");
        DescriptionRef.current.value = Cookie.get("description");
        setName(Cookie.get("name"));
        setPassword(Cookie.get("password"));
        setDescription(Cookie.get("description"));
    }, []);

    return (
        <>
            <div className="AccountSettings">
                <Stack gap={3}>
                    <Form className="mt-5">
                        <Form.Group>
                            <Form.Text>Name:</Form.Text>
                            <Form.Control
                                type="text"
                                ref={NameRef}
                                onChange={() => {
                                    setName(NameRef.current.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>Password:</Form.Text>
                            <Form.Control
                                type="text"
                                ref={PasswordRef}
                                onChange={() => {
                                    setPassword(PasswordRef.current.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>Description:</Form.Text>
                            <Form.Control
                                as="textarea"
                                ref={DescriptionRef}
                                onChange={() => {
                                    setDescription(
                                        DescriptionRef.current.value
                                    );
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <ButtonGroup>
                        <Button variant="warning" onClick={Exit}>
                            Exit
                        </Button>
                        <Button variant="danger" onClick={DeleteAccount}>
                            Delete Account
                        </Button>
                        <Button variant="success" onClick={Change}>
                            Change
                        </Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </>
    );
}
