import React, { useEffect, useRef, useState } from "react";
import "./AccountSettings.css";
import Cookie from "js-cookie";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommentsComponent from '../../components/CommentsComponent/CommentsComponent.js'
import Fetch from '../../helpers/fetch.js'
export default function AccountSettings(props) {
    let [Name, setName] = useState("");
    let [Password, setPassword] = useState("");
    let [Description, setDescription] = useState("");
    let [MBTITYPE, setMBTITYPE] = useState("");

    const NameRef = useRef();
    const PasswordRef = useRef();
    const DescriptionRef = useRef();
    const MBTIRef = useRef();

    const Navigate = useNavigate();

    // Перенаправляет пользователя на главную страницу и обновляет главный компоненнт.
    // Нужно чтобы в топ меню все отображалось корректно. 
    function NavigateAndReRender(){
        props.ReRender();
        Navigate('/');
    }

    // Делает возможным выход из аккаунта. 
    // Удаляет из кукки все данные и перенаправляет пользователя на главный экран
    // с его обновлением.
    function Exit(props) {
        if ( confirm("Are you sure?") == true ) {
            Cookie.remove("name");
            Cookie.remove("password");
            Cookie.remove("login");
            Cookie.remove("description");
            Cookie.remove("MBTITYPE");
            Cookie.remove("ID");
            NavigateAndReRender();
        }
    }


    // Отправляе измененные данные на бэкенд , а так же сохраняет новые данные в 
    // кукки
    function Change() {
        if (confirm("Are you sure?") == true) {

            Fetch(
                "POST",
                {
                    __method: 'UpdateUser', 
                    login: Cookie.get('login'),
                    name: Cookie.get('name'),
                    CheckPassword: Cookie.get('password'),
                    new_name: Name, 
                    new_password: Password, 
                    new_description: Description, 
                    new_MBTITYPE: MBTITYPE
                },
            )
                    Cookie.set("name", Name);
                    Cookie.set("password", Password);
                    Cookie.set("description", Description);
                    Cookie.set("MBTITYPE", MBTITYPE);
                    alert("Данные обновлены");
                
        }
    }

    // Удаляет аккаунт и все его данные в кукки.
    // Оставлю это так потому что работает XD 
    function DeleteAccount() {
        console.log("Click Delete");
        if (confirm("Are you sure?") == true) {
                console.log("Account deleted!");
                let payload = new FormData();
                payload.append("__method", "DeleteUser");
                payload.append("name", Name);
                payload.append("login", Cookie.get("login"));
                payload.append("CheckPassword", Password);
                fetch("http://localhost:80/backend/index.php", {
                    method: "POST",
                    body: payload,
                })
                    .then((response) => {
                        response.text();
                    })
                    .then((result) => {
                        Cookie.remove("name");
                        Cookie.remove("login");
                        Cookie.remove("password");
                        Cookie.remove("description");
                        Cookie.remove("MBTITYPE");
                        Cookie.remove("ID");
                        NavigateAndReRender();
                    })
                    .catch((error) => console.log("error", error));

            //    Fetch( "POST",
            //        {
            //            __method: "DeleteUser",
            //            name : Name,
            //            login: Cookie.get('login'),
            //            CheckPassword: Password,
            //        },
            //        (json)=>{ 
            //            Cookie.remove("name");
            //            Cookie.remove("login");
            //            Cookie.remove("password");
            //            Cookie.remove("description");
            //            Cookie.remove("MBTITYPE");
            //            NavigateAndReRender();
            //        }
            //    )





        }
    }

    useEffect(() => {
        // Вписывает имя , пароль , описание и тип в поля ввода из данных кукки. 
        NameRef.current.value = Cookie.get("name");
        PasswordRef.current.value = Cookie.get("password");
        DescriptionRef.current.value = Cookie.get("description");
        MBTIRef.current.value = Cookie.get('MBTITYPE');
        // Так же вписывает значения из кукки в локальные стейты. 
        setName(Cookie.get("name"));
        setPassword(Cookie.get("password"));
        setDescription(Cookie.get("description"));
        setMBTITYPE(Cookie.get('MBTITYPE'))
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
                        <Form.Group>
                            <Form.Text>MBTI тип:</Form.Text>
                    <Form.Select
                    onChange={ (e)=>{
                        setMBTITYPE(e.target.value);
                    } }
                        aria-label='Ваш MBTI тип'
                        ref={MBTIRef}
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
                    <CommentsComponent
                        AnquetteID={Cookie.get('ID')} 
                />
                </Stack>
            </div>
        </>
    );
}
