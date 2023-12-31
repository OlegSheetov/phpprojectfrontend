import React , {useState , useEffect, useRef, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu.js";
import AnquetteCard from "./components/AnquetteCard/AnquetteCard.js";
import RegistrationComponent from "./components/RegistrationComponent/RegistrationComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import AnquetteDetailed from "./components/AnquetteDetailed/AnquetteDetailed.js";
import AccountSettings from "./components/AccountSettings/AccountSettings.js";
import SearchByType from "./components/SearchByType/SearchByType.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import WhatIsAnquette from './components/WhatIsAnquette/WhatIsAnquette.js';


export default function App () {
    let [users , setUsers] = useState([]);

    let usersRef = useRef();
    const [RerenderValue , ReRender] = useReducer(  x=> x+1, 0);

    // Функция которая запрашивает с сервака всех пользователей. Не принимает параметров.
    // Каждый раз список пользователей приходит в рандомном порядке. 
    // После получения записывает полученный обьект с пользователями в стейт Users , 
    // а так же в хранилище сессии , чтобы , когда пользователь перейдет на страницу карточики
    // и по какой либо причине обновит страницу , программа не теряла данные и не выдавала 
    // ошибку.
    function fetchUsers() { 
       fetch("http://localhost:80/.backend/index.php", {method: "GET"})
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(json => {
                setUsers(json);
                sessionStorage.Users = JSON.stringify(json)
            })
           .catch(error => console.log('error', error));
    }

    // Записывает данные с пользователями при перезагрузке страницы 
    // в стейт Users из сессионного хранилища.  
    function SaveUsersToSessionStorage(){ 
            if(sessionStorage.Users == '[]' || sessionStorage.Users != undefined){ 
                setUsers(JSON.parse(sessionStorage.Users))
            }
    }

    useEffect(()=>{
        fetchUsers();
        SaveUsersToSessionStorage();
    }, [RerenderValue])

    // Ищет определенную запись в стейте по id. 
       function getUser(id){ 
           return users.find((el) => el.id == id)
       }


        return (
            <BrowserRouter>
                <div className="App">
                    <TopMenu
                        ReRenderValue={RerenderValue}
                    />
                <Container>
                            <Routes>
                                <Route 
                                    path="/SearchByType"
                                    element={<SearchByType users={users} />}
                                />
                               <Route 
                                   path="/"
                                   element={<AnquetteCard users={users}/>}
                               />
                                <Route 
                                    path="/Registration"
                                    element={<RegistrationComponent ReRender={ReRender}/>}
                                />
                                <Route
                                    path="/Login"
                                    element={<LoginComponent ReRender={ReRender} />}
                                />
                                <Route
                                    path="/:key"
                                    element={<AnquetteDetailed users={users}/>}
                                />
                                <Route
                                    path="/AccountSettings"
                                    element={<AccountSettings ReRender={ReRender}/>} 
                                />
                                <Route 
                                    path="/WhatIsAnquette"
                                    element={<WhatIsAnquette/>}
                                />
                            </Routes>
                    </Container>
                    <div className="footer">
                        <div>
                            <a href="https://www.freepik.com/free-photo/beautiful-shot-top-mountain_11111354.htm
                            #query=picks&position=0&from_view=search&track=sph&uuid=218e7aa6-c4a0-43bd-8f30-1d81ad3084bb">Image by wirestock</a> on Freepik
                        </div>
                        <div>
                            <a target="_blank" href="https://icons8.com/icon/15108/handwritten-ocr">Handwritten OCR</a> icon by 
                            <a target="_blank" href="https://icons8.com">Icons8</a>
                        </div>
                        <div>
                            <a target="_blank" href="https://icons8.com/icon/3059/undo">Undo</a> icon by
                            <a target="_blank" href="https://icons8.com">Icons8</a>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
}

