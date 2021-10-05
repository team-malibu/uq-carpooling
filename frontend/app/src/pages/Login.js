import React, {useState} from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import PlainBackground from '../components/PlainBackground';
import { InputPassword, InputEmail } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';


function Login() {
 

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
                            placeholder="Student Email"
                            iconLeft={<MdLockOutline />}
                            iconRight={<MdLockOutline />}
                        />
                    </div>
                    <div className="inputPassword">
                        <InputPassword
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