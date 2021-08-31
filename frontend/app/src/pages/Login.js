import React from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/SignInButtons';
import { UserInfoInput } from '../components/UserInfoInput';
import PlainBackground from '../components/PlainBackground';


function Login() {
    return (
        <div>
            <PlainBackground />
            <div class='thiswrapper'>
            
                <div className="background">
                
                </div>
                <div className="top" >
                <h2 className="thistitle">UQ Carpooling</h2>
                </div>
                <div className='body'>

                    <div className="inputEmail">
                        <UserInfoInput type="email"
                            className="form-control"
                            id="email"
                            //value={email}
                            //onChange={}
                            placeholder="Student Email"

                        />
                    </div>
                    <div className="inputPassword">
                        <UserInfoInput type="password"
                            className="form-control"
                            id="email"
                            //value={email}
                            //onChange={}
                            placeholder="Password"

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