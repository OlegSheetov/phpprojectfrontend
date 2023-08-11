import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu.js";
import AnquetteCard from "./components/AnquetteCard/AnquetteCard.js";
import RegistrationComponent from "./components/RegistrationComponent/RegistrationComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import AnqueteeDetailed from "./components/AnquetteDetailed/AnquetteDetailed.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";


class App extends Component {
    componentDidMount() {
        console.log("hello world");
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <TopMenu />
                    <Container>
                        <Routes>
                            <Route path="/" element={<AnquetteCard />} />
                            <Route
                                path="/Registration"
                                element={<RegistrationComponent />}
                            />
                            <Route path="/Login" element={<LoginComponent />} />
                            <Route path="/AnquetteDetailed" element={<LoginComponent />} />

                        </Routes>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
