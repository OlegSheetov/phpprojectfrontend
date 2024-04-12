import React , {useState , useEffect,  useReducer } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu.js";
import AnquetteCard from "./components/AnquetteCard/AnquetteCard.js";
import RegistrationComponent from "./components/RegistrationComponent/RegistrationComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import AnquetteDetailed from "./components/AnquetteDetailed/AnquetteDetailed.js";
import AccountSettings from "./components/AccountSettings/AccountSettings.js";
import SearchByType from "./components/SearchByType/SearchByType.js";
import WhatIsAnquette from './components/WhatIsAnquette/WhatIsAnquette.js';
import AdminPanel from './components/AdminPanelComponents/AdminPanel/AdminPanel.jsx'
import AdminPanelLoginScreen from './components/AdminPanelComponents/AdminPanelLoginScreen/AdminPanelLoginScreen.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Fetch from './helpers/fetch.js';
export default function App () {
    let [users , setUsers] = useState([]);
    const [RerenderValue , ReRender] = useReducer(  x=> x+1, 0);

    // Я просто скопировал это из инте по этому не знаю как это работае. НО работает. 
    Array.prototype.includesObj = function(obj) {
       for(let i = 0; i < this.length; i++) {
           if(JSON.stringify(this[i],
               Object.keys(this[i]).sort()) === JSON.stringify(obj, Object.keys(obj).sort()))
               return true;
       }
       return false;
    }


    
    // Записывает данные с пользователями при перезагрузке с раницы 
    // в стейт Users из сессионного хранилища.  
    function SaveUsersToSessionStorage(){ 
            if(sessionStorage.Users == '[]' || sessionStorage.Users != undefined){ 
                setUsers(JSON.parse(sessionStorage.Users))
            }
    }

    useEffect(()=>{
        Fetch(
            "GET",
            undefined, 
            (json)=>{
            setUsers(json);
            sessionStorage.Users = JSON.stringify(json)
        })
        SaveUsersToSessionStorage();
    }, [RerenderValue])

    // Оно работает. По этому не трогаю.
        function PutNewPourtion(){ 
            function onlyNew(el){return !users.includesObj(el)
                }
            Fetch(
                "GET",
                undefined, 
                (json)=>{
                    let newAnquettes = json.filter(onlyNew)
                    setUsers([...users , ...newAnquettes])
                    const oldUsers = JSON.parse(sessionStorage.Users)
                    sessionStorage.Users = JSON.stringify([...oldUsers , ...newAnquettes]);
            })
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
                               element={
                                   <AnquetteCard 
                                        users={users}
                                        PutNewPourtion={PutNewPourtion}
                                   />
                               }
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
                                <Route 
                                    path="/AdminPanel"
                                    element={<AdminPanel/>}
                                />
                                <Route 
                                    path="/AdminPanelLoginScreen"
                                    element={<AdminPanelLoginScreen/>}
                                />
                                
                            </Routes>
                    </Container>
                    <div className="footer">
                        <div>
                            <a href="https://www.freepik.com/free-photo/beautiful-shot-top-mountain_11111354.html#query=picks&position=0&from_view=search&track=sph&uuid=218e7aa6-c4a0-43bd-8f30-1d81ad3084bb">Image by wirestock</a> on Freepik
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

