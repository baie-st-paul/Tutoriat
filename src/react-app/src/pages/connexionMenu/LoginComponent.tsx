import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import "./ConnexionMenuPage.css";

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const showPasswRef = useRef(null);

    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
    const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$');

    function showPass(){
        if (showPasswRef.current.type === "password") {
            showPasswRef.current.type = "text";
        } else {
            showPasswRef.current.type = "password";
        }
    }

    return (
        <div className="fgroup">
            <form autoComplete="off" >
                <h1 className="h2 text-cente">Login</h1>
                <div className="form-group form_container">
                    <input className="form-control px-3 m-0" type="text" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <p ref={emailRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <div className="icons">
                        <i onClick={showPass}><FontAwesomeIcon icon={faEye}/></i>
                    </div>
                    <input ref={showPasswRef} id="pass" className="form-control m-0" type="password" placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <p ref={passwordRef} className="px-1 text-danger"></p>
                </div>
                <input type="submit" value="Connexion" className="btn btn-lg btn-outline-primary "/>
            </form>
        </div>
    );
}

export default LoginComponent;