import React, {useState} from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import PlainBackground from '../components/PlainBackground';
import { InputPassword, InputEmail } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';


function Login() {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleEmail(thisEmail) {
        setUserEmail(thisEmail)
    }

    function handlePassword(thisPassword) {
        setUserPassword(thisPassword)
    }
 
    return (
        <div>
            <div class='login-wrapper'>
                <PlainBackground />
                <div className='login-body'>
                    <div className="login-title">
                        <h1>
                            Login
                        </h1>
                    </div>
                    <form method="post"> 
                    <div className="inputEmail">
                        <InputEmail
                            value = {userEmail}
                            onChange = {handleEmail}
                            placeholder="Student Email"
                            iconLeft={<MdLockOutline />}
                            
                        />
                    </div>
                    <div className="inputPassword">
                        <InputPassword
                            value = {userPassword}
                            onChange = {handlePassword}
                            placeholder="Password"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>

                    <div className="loginButton">
                        <LoginButton name="Login" />
                    </div>
                    </form>
                   
                    <div className="createAccountButton">

                        <CreateAccountButton name="Create Account" />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login