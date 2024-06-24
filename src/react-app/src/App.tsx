import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes, Route, Router} from "react-router-dom";
import React from "react";
import ConnexionMenuPage from "./pages/connexionMenu/ConnexionMenuPage.tsx";


function App() {
  return (
    <div>
        <Routes>
            <Route path={"/"} element={<ConnexionMenuPage/>} />
        </Routes>
    </div>
  );
}

export default App;
