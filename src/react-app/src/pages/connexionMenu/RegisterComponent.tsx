import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../models/User.ts";
import {useUser} from "../../Context/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {existByEmail, register} from "../../APIs/fetchAuth.ts";
import $ from 'jquery';
import TeachersSubjectComponent from "./TeachersSubjectComponent.tsx";

enum UserClassSelection {
    STUDENT,
    TEACHER,
    NONE
}

function RegisterComponent() {
    const { loggedInUser, setLoggedInUser } = useUser();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [passwordShowIcon, setPasswordShowIcon] = useState<IconDefinition>(faEye)
    const [passwordConfirmShowIcon, setPasswordConfirmShowIcon] = useState<IconDefinition>(faEye)
    const [userClass, setUserClass] = useState<UserClassSelection>(UserClassSelection.NONE)
    const [subject, setSubject] = useState<Array<string>>([])

    const emailRef = useRef(null)
    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmRef = useRef(null)
    const showPasswRef = useRef(null)
    const showPasswConfRef = useRef(null)
    const errorRef = useRef(null)

    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i)
    const validPassword = password.match('^(?=.*[A-Z])(?=.*[@#$%^&+=!])(.{6,20})$')
    const validFirstname = firstname.match('^[a-zA-Z]+$')
    const validLastname = lastname.match('^[a-zA-Z]+$')

    useEffect(() => {
            $("#btn_user_class_student").addClass("btn-outline-success")
            $("#btn_user_class_teacher").addClass("btn-outline-success")
        },[])

    function showPass(){
        if (showPasswRef.current.type === "password") {
            showPasswRef.current.type = "text";
            setPasswordShowIcon(faEyeSlash);
        } else {
            showPasswRef.current.type = "password";
            setPasswordShowIcon(faEye);
        }
    }

    function showPassConfirm(){
        if (showPasswConfRef.current.type === "password") {
            showPasswConfRef.current.type = "text";
            setPasswordConfirmShowIcon(faEyeSlash);
        } else {
            showPasswConfRef.current.type = "password";
            setPasswordConfirmShowIcon(faEye);
        }
    }

    async function submitRegister(e) {
        e.preventDefault();
        let allGood = true;

        if (firstname.trim() === "") {
            firstnameRef.current.innerText = "* Prénom vide";
            allGood = false;
        } else {
            firstnameRef.current.innerText = "";
        }

        if (firstname.trim() !== '' && !validFirstname) {
            firstnameRef.current.innerText = "* Prénom invalide";
            allGood = false;
        }

        if (lastname.trim() === "") {
            lastnameRef.current.innerText = "* Nom vide";
            allGood = false;
        } else {
            lastnameRef.current.innerText = "";
        }

        if (lastname.trim() !== '' && !validLastname) {
            lastnameRef.current.innerText = "* Nom invalide";
            allGood = false;
        }

        if (email.trim() === "") {
            emailRef.current.innerText = "* Email vide";
            allGood = false;
        } else {
            emailRef.current.innerText = "";
        }

        if (email.trim() !== '' && !validEmail) {
            emailRef.current.innerText = "* Email invalide";
            allGood = false;
        }

        if (password.trim() === "") {
            passwordRef.current.innerText = "* Mot de passe vide";
            allGood = false;
        } else {
            passwordRef.current.innerText = "";
        }

        if (password.trim() !== '' && !validPassword) {
            passwordRef.current.innerText = "* Mot de passe invalide";
            allGood = false;
        }

        if (password.trim() !== '' && passwordConfirm.trim() !== '' && password !== passwordConfirm) {
            passwordConfirmRef.current.innerText = "* Les mots de passe ne correspondent pas";
            allGood = false;
        }

        await existByEmail(email)
            .then((exist: boolean) => {
                if (exist) {
                    emailRef.current.innerText = "* Email déjà utilisé";
                    allGood = false;
                }
            }).catch(() => {
                emailRef.current.innerText = "* Email déjà utilisé";
                allGood = false;
            });

        if (allGood) {
            register(firstname, lastname, email, password)
                .then((user: User) => {
                    setLoggedInUser(user);
                    navigate("/home");
                }).catch((error) => {
                console.error("Error:", error);
                errorRef.current.innerText = "* Erreur d'inscription";
            });
        }
    }

    return (
        <div className="fgroup">
            <form autoComplete="off" onSubmit={submitRegister}>
                <h1 className="h2 text-center">Register</h1>
                <div className="form-group form_container">
                    <input className="form-control px-3 m-0" type="text" placeholder="Firstname"
                           value={firstname}
                           onChange={e => setFirstname(e.target.value)}/>
                    <p ref={firstnameRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <input className="form-control px-3 m-0" type="text" placeholder="Lastname"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}/>
                    <p ref={lastnameRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <input className="form-control px-3 m-0" type="email" placeholder="Email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <p ref={emailRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <div className="icons">
                        <i onClick={showPass}><FontAwesomeIcon icon={passwordShowIcon}/></i>
                    </div>
                    <input ref={showPasswRef} className="form-control m-0" type="password" placeholder="Mot de passe"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <p ref={passwordRef} className="px-1 text-danger"></p>
                </div>
                <div className="form-group form_container">
                    <div className="icons">
                        <i onClick={showPassConfirm}><FontAwesomeIcon icon={passwordConfirmShowIcon}/></i>
                    </div>
                    <input ref={showPasswConfRef} className="form-control m-0" type="password" placeholder="Confirmer mot de passe"
                           value={passwordConfirm}
                           onChange={e => setPasswordConfirm(e.target.value)}/>
                    <p ref={passwordConfirmRef} className="px-1 text-danger"></p>
                </div>
                <div className="justify-content-center d-flex">
                    <button id="btn_user_class_student" type="button" className="btn btn_user_class mx-3"
                    onClick={() => {
                        setUserClass(UserClassSelection.STUDENT)
                        const btn_user_class_student = $("#btn_user_class_student")
                        const btn_user_class_teacher = $("#btn_user_class_teacher")
                        if (btn_user_class_student.hasClass("btn-outline-success")){
                            btn_user_class_student.removeClass("btn-outline-success")
                            btn_user_class_student.addClass("btn-success")
                        }
                        if (btn_user_class_teacher.hasClass("btn-success")){
                            btn_user_class_teacher.removeClass("btn-success")
                            btn_user_class_teacher.addClass("btn-outline-success")
                        }
                    }}
                     >Student</button>
                    <button id="btn_user_class_teacher" type="button" className="btn btn_user_class mx-3"
                    onClick={() => {
                        setUserClass(UserClassSelection.TEACHER)
                        const btn_user_class_student = $("#btn_user_class_student")
                        const btn_user_class_teacher = $("#btn_user_class_teacher")
                        if (btn_user_class_teacher.hasClass("btn-outline-success")){
                            btn_user_class_teacher.removeClass("btn-outline-success")
                            btn_user_class_teacher.addClass("btn-success")
                        }
                        if (btn_user_class_student.hasClass("btn-success")){
                            btn_user_class_student.removeClass("btn-success")
                            btn_user_class_student.addClass("btn-outline-success")
                        }
                    }}
                    >Teacher</button>
                </div>
                { userClass === UserClassSelection.TEACHER &&
                    <TeachersSubjectComponent subjects={subject} setSubjects={setSubject}/>
                }

                <p ref={errorRef} className="px-1 text-danger"></p>
                <input type="submit" value="S'inscrire" className="btn btn-lg btn-outline-primary "/>
            </form>
        </div>
    );
}

export default RegisterComponent;