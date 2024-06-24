import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import "./ConnexionMenuPage.css";
import {login} from "../../APIs/fetchAuth.ts";
import {User} from "../../models/User.ts";
import {useUser} from "../../Providers/UserProvider.tsx";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
    const { loggedInUser, setLoggedInUser } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [icon, setIcon] = useState(faEye);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const showPasswRef = useRef(null);
    const errorRef = useRef(null);

    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
  //  const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$');

    function showPass(){
        if (showPasswRef.current.type === "password") {
            showPasswRef.current.type = "text";
            setIcon(faEyeSlash);
        } else {
            showPasswRef.current.type = "password";
            setIcon(faEye);
        }
    }

    function submitLogin(e){
        e.preventDefault();
        let allGood = true;

        if (email.trim() === "") {
            emailRef.current.innerText = "* Email vide";
            allGood = false;
        } else {
            emailRef.current.innerText = "";
        }

        if (email.trim()!=='' && !validEmail) {
            emailRef.current.innerText = "* Email invalide";
            allGood = false;
        }

        if (password.trim() === "") {
            passwordRef.current.innerText = "* Mot de passe vide";
            allGood = false;
        } else {
            passwordRef.current.innerText = "";
        }

       // if (password.trim()!=='' && !validPassword) {
       //     passwordRef.current.innerText = "* Mot de passe invalide";
       //     allGood = false;
       // }

        if (allGood) {
            login(email, password)
                .then((user:User) => {
                    setLoggedInUser(user);
                    navigate("/home");
                }).catch((error) => {
                    console.error("Error:", error);
                    errorRef.current.innerText = "Email ou mot de passe incorrect";
                });
        }
    }

    return (
        <div className="fgroup">
            <form autoComplete="off" onSubmit={submitLogin}>
                <h1 className="h2 text-cente">Login</h1>
                <div className="form-group form_container">
                    <input className="form-control px-3 m-0" type="text" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <p ref={emailRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <div className="icons">
                        <i onClick={showPass}><FontAwesomeIcon icon={icon}/></i>
                    </div>
                    <input ref={showPasswRef} id="pass" className="form-control m-0" type="password" placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <p ref={passwordRef} className="px-1 text-danger"></p>
                </div>
                <p ref={errorRef} className="px-1 text-danger"></p>
                <input type="submit" value="Connexion" className="btn btn-lg btn-outline-primary "/>
            </form>
        </div>
    );
}

export default LoginComponent;