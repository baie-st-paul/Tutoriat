import React, {useState} from 'react';
import LoginComponent from "./LoginComponent.tsx";
import RegisterComponent from "./RegisterComponent.tsx";

export default function ConnexionMenuPage() {
    const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <>
        <div className="d-flex justify-content-center mt-5">
            {isLoginPage ? <LoginComponent/> : <RegisterComponent/>}
        </div>
        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-lg btn-outline-primary mt-3" onClick={() => setIsLoginPage(!isLoginPage)}>{isLoginPage ? <>Register</> : <>Login</>}</button>
        </div>
    </>
    );
}