import React from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import PlainBackground from '../components/PlainBackground';
import { InputPasswordText, InputSignUpText } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';


function Login() {
    return (
        <div>
            <div class='login-wrapper'>
                <PlainBackground />
                <div className='login-body'>
                    <div className="login-top">
                        <h1>
                            Login
                        </h1>
                    </div>



                    <div className="inputEmail">
                        <InputSignUpText
                            placeholder="Student Email"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>
                    <div className="inputPassword">
                        <InputPasswordText
                            placeholder="Password"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>
                    <div className="loginButton">

                        <LoginButton name="Login" />
                    </div>
                    <div className="createAccountButton">

                        <CreateAccountButton name="Create Account" />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login