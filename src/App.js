import React , {useState , useEffect, createContext }from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu.js";
import AnquetteCard from "./components/AnquetteCard/AnquetteCard.js";
import RegistrationComponent from "./components/RegistrationComponent/RegistrationComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import AnquetteDetailed from "./components/AnquetteDetailed/AnquetteDetailed.js";
import AccountSettings from "./components/AccountSettings/AccountSettings.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import WhatIsAnquette from './components/WhatIsAnquette/WhatIsAnquette.js';



export default function App () {
    let [users , setUsers] = useState([]);
    let [logged , setLogged] = useState(false);
    const UsersContext = createContext();

    useEffect(()=>{
        fetch("http://localhost:80/backend/index.php", {method: "GET"})
           .then(response => response.text())
           .then(result => JSON.parse(result)).then(json => setUsers(json))
           .catch(error => console.log('error', error));
    }, [])


    function getUser(id){ 
        return users.find((el) => el.id == id)
    }
        return (
            <BrowserRouter>
                <div className="App">
                    <TopMenu />
                    <Container>
                            <Routes>
                                <Route 
                                    path="/"
                                    element={<AnquetteCard users={users} />}
                                />
                                <Route 
                                    path="/Registration"
                                    element={<RegistrationComponent/>}
                                />
                                <Route
                                    path="/Login"
                                    element={<LoginComponent />}
                                />
                                <Route
                                    path="/:key"
                                element={
                                    <UsersContext.Provider value={users}>
                                        <AnquetteDetailed/>
                                    </UsersContext.Provider>
                                }
                                />
                                <Route
                                    path="/AccountSettings"
                                    element={<AccountSettings/>} 
                                />
                                <Route 
                                    path="/WhatIsAnquette"
                                    element={<WhatIsAnquette/>}
                                />
                            </Routes>
                    </Container>
                </div>
            </BrowserRouter>
        );
}

