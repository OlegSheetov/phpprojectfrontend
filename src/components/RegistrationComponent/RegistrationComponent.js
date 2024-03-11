

    // TODO: Переписать валидацию формы как я это сделал на странице логина
    // админа и использовать хелпер FETCH

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
import Fetch from '../../helpers/fetch.js';

export default function RegistrationComponent(props) {
    const Navigate = useNavigate();
    // Стейты для записи значений из полей ввода для отправки их на сервер.
    let [name, setName] = useState("");
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [passwordAgain, setPasswordAgain] = useState("");
    let [description, setDescription] = useState("");
    let [MBTITYPE, setMBTITYPE] = useState("");

    // Стейты для валидации полей ввода.
    // Содержат булевое значение false.
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

    // Перенаправляет пользователя на главную страницу и обновляет главный компоненнт.
    // Нужно чтобы в топ меню все отображалось корректно.
    function NavigateAndReRender() {
        props.ReRender();
        Navigate("/");
    }

    // Функция обрабатывающая форму регистрации. Не принимает параметров.
    function formHandler() {
        // Проверка на заполненность полей ввода. Если все ок отправляет данные на сервак.
        if (formValidation()) {
            saveCookie();
                    Fetch("POST",{ 
                        __method: "InsertNewUser", 
                        name: name, 
                        login: login, 
                        password: password, 
                        description: description, 
                        MBTITYPE: MBTITYPE
                    },
                       (json)=>{
                           // После проверки нет ли в базе данных 
                           // пользователя с таким же именем и логином,
                            // сервак присылает json с ответом.
                           // И если в ответе NEW , что значит что пользователь новый 
                           // - то данные записываются в кукки.
                           // Если нет - то выводит сообщение что такой пользователь
                           // уже есть , придумай новое имя и логин.
                            if (json.response == "NEW") {
                                Cookie.set("ID", json, {
                                    secure: true,
                                    sameSite: "strict",
                                });
                                NavigateAndReRender();
                            }
                            if (json.response == "DUPLICATE") {
                                console.log(json);
                                alert(
                                 "Такой никнейм и логин заняты . Пожалуйста измените их."
                                );
                            }
                    }) 
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
            !MBTIRef.current.value ==  true
        ) {
            setNameValid(true);
            setLoginValid(true);
            setPasswordValid(true);
            setPasswordAgainValid(true);
            setDescriptionValid(true);
            setMBTIValid(true);
            alert('false')
            console.log(!nameRef.current.value)
            return false;
        } else {
            setNameValid(false);
            setLoginValid(false);
            setPasswordValid(false);
            setPasswordAgainValid(false);
            setDescriptionValid(false);
            setMBTIValid(false);
            alert('true')
            return true;
        }
    }

    /**
     * AudoMakeLogin.
     * Берет имя из поля формы и записывает его
     * в поле с логином и его стейт.
     *
     * @param {} e
     */
    function AudoMakeLogin(e) {
        loginRef.current.value = `@${e.target.value}Login`;
        setLogin(loginRef.current.value);
    }

    /**
     * checkPassword.
     * Проверяет совпадают ли оба поля с паролями. Если нет ,
     * то поля подсвечиваются красным.
     *
     * @param {} e
     */
    function checkPassword(e) {
        if (e.target.value != passwordRef.current.value) {
            setPasswordValid(true);
            setPasswordAgainValid(true);
        } else {
            setPasswordValid(false);
            setPasswordAgainValid(false);
        }
    }

    /**
     * saveCookie.
     * ф-ция хелпер. Записывает имя , пароль , логин , описание и тип в кукки.
     */
    function saveCookie() {
        Cookie.set("name", name, { secure: true, sameSite: "strict" });
        Cookie.set("login", login, { secure: true, sameSite: "strict" });
        Cookie.set("password", password, { secure: true, sameSite: "strict" });
        Cookie.set("description", description, {
            secure: true,
            sameSite: "strict",
        });
        Cookie.set("MBTITYPE", MBTITYPE, { secure: true, sameSite: "strict" });
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
                        onChange={(e) => {
                            setMBTITYPE(e.target.value);
                        }}
                        aria-label="Ваш MBTI тип"
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
                        >
                            Пройти тест бесплатно
                        </a>
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="button" onClick={formHandler}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
