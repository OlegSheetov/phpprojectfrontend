import React, { useState, useRef } from "react";
import "./RegistrationComponent.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function RegistrationComponent() {
    const Navigate = useNavigate();
    let [name, setName] = useState("");
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [passwordAgain, setPasswordAgain] = useState("");
    let [description, setDescription] = useState("");
    let [MBTITYPE, setMBTITYPE] = useState("");

    let [nameValid, setNameValid] = useState(false);
    let [loginValid, setLoginValid] = useState(false);
    let [passwordValid, setPasswordValid] = useState(false);
    let [passwordAgainValid, setPasswordAgainValid] = useState(false);
    let [descriptionValid, setDescriptionValid] = useState(false);
    let [formValid, setFormValid] = useState(false);
    let [MBTIValid, setMBTIValid] = useState(false);

    const nameRef = useRef();
    const loginRef = useRef();
    const passwordRef = useRef();
    const passwordAgainRef = useRef();
    const descriptionRef = useRef();
    const MBTIRef = useRef();

    function formHandler() {
        if (formValidation()) {
            saveCookie();
            let payload = new FormData();
            payload.append("__method", "InsertNewUser");
            payload.append("name", name);
            payload.append("login", login);
            payload.append("password", password);
            payload.append("description", description);
            payload.append("MBTITYPE", MBTITYPE);
            fetch("http://localhost:80/.backend/index.php", {
                method: "POST",
                body: payload,
            })
                .then((response) => {
                    response.text();
                })
                .catch((error) => console.error("error", error));
            Navigate("/Login");
        }
    }

    /*
     *  formValidation - функция которая проверяет значения в форме регистрации
     *  и подкрашивает красным те поля которые пользователь забыл ввести.
     *  Назначет в стейт formValid - true  если все поля заполнены и false в противоположном случае.
     */
    function formValidation() {
        if (
            !nameRef.current.value == true ||
            !loginRef.current.value == true ||
            !passwordRef.current.value == true ||
            !passwordAgainRef.current.value == true ||
            !descriptionRef.current.value == true ||
            !MBTIRef.current.value == true
        ) {
            //setFormValid(false);
            setNameValid(!nameRef.current.value);
            setLoginValid(!loginRef.current.value);
            setPasswordValid(!passwordRef.current.value);
            setPasswordAgainValid(!passwordAgainRef.current.value);
            setDescriptionValid(!descriptionRef.current.value);
            setMBTIValid(!descriptionRef.current.value);
            return false
        } else {
            //setFormValid(true);
            setNameValid(!nameRef.current.value);
            setLoginValid(!loginRef.current.value);
            setPasswordValid(!passwordRef.current.value);
            setPasswordAgainValid(!passwordAgainRef.current.value);
            setDescriptionValid(!descriptionRef.current.value);
            setMBTIValid(!descriptionRef.current.value);
            return true 
        }
    }

    function AudoMakeLogin(e) {
        loginRef.current.value = `@${e.target.value}Login`;
        setLogin(loginRef.current.value);
    }

    function checkPassword(e) {
        if (e.target.value != passwordRef.current.value) {
            setPasswordValid(true);
            setPasswordAgainValid(true);
        } else {
            setPasswordValid(false);
            setPasswordAgainValid(false);
        }
    }

    function saveCookie() {
        Cookie.set("name", name, { secure: true, sameSite: "strict" });
        Cookie.set("login", login, { secure: true, sameSite: "strict" });
        Cookie.set("password", password, { secure: true, sameSite: "strict" });
        Cookie.set("description", description, { secure: true, sameSite: "strict", });
        Cookie.set("MBTITYPE", MBTITYPE, { secure: true, sameSite: "strict", });
    }

    return (
        <Container className="RegistrationComponent">
            <Form noValidate>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Введите имя / никнейм / псевдоним"
                        onChange={(e) => {
                            setName(e.target.value);
                            AudoMakeLogin(e);
                        }}
                        isInvalid={nameValid}
                        ref={nameRef}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="login"
                        placeholder="Введите логин"
                        onChange={(e) => {
                            setLogin(e.target.value);
                        }}
                        isInvalid={loginValid}
                        ref={loginRef}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        isInvalid={passwordValid}
                        ref={passwordRef}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Повторите пароль"
                        onChange={(e) => {
                            setPasswordAgain(e.target.value);
                            checkPassword(e);
                        }}
                        ref={passwordAgainRef}
                        isInvalid={passwordAgainValid}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        placeholder="Описание вашей работы"
                        className="RegistrationComponent_Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        ref={descriptionRef}
                        isInvalid={descriptionValid}
                        required
                    />
                    <Form.Label className="text-muted">
                        *225 Символов максимум
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select
                    onChange={ (e)=>{
                        setMBTITYPE(e.target.value);
                    } }
                        aria-label='Ваш MBTI тип'
                        ref={MBTIRef}
                        isInvalid={MBTIValid}
                        required
                >
                        <option value="INTJ">INTJ "Стратег"</option>
                        <option value="INTP">INTP "Ученый"</option>
                        <option value="ENTJ">ENTJ "Коммандир"</option>
                        <option value="ENTP">ENTP "Полемист"</option>
                        <option value="INFJ">INFJ "Активист"</option>
                        <option value="INFP">INFP "Посредник"</option>
                        <option value="ENFJ">ENFJ "Тренер"</option>
                        <option value="ENFP">ENFP "Борец"</option>
                        <option value="ISTJ">ISTJ "Администратор"</option>
                        <option value="ISFJ">ISFJ "Защитник"</option>
                        <option value="ESTJ">ESTJ "Менеджер"</option>
                        <option value="ESFJ">ESFJ "Консул"</option>
                        <option value="ISTP">ISTP "Виртуоз"</option>
                        <option value="ISFP">ISFP "Артист"</option>
                        <option value="ESTP">ESTP "Делец"</option>
                        <option value="ESFP">ESFP "Развлекатель"</option>
                    </Form.Select>
                    <Form.Label className="text-muted">
                        <a 
                            href="https://www.16personalities.com/ru"
                            target="_blank"
                        >Пройти тест бесплатно</a>
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="button" onClick={formHandler}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
