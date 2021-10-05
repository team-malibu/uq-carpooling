import React from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import { useHistory, Link } from 'react-router-dom';
import { InputPasswordText, InputSignUpText } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';
import BasicPage from '../components/BasicPage';

function Login(props) {
    const history = useHistory();

    function createLogin() {
        return (
            <>
                <div className='login-body'>
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
                    <div class='createAccountButton' onClick={() => {
                        history.push('/Signup')}}>
                        <CreateAccountButton name="Create Account" />
                    </div>
                </div>
            </>
        )
    }

    
    return (
    <BasicPage name={"UQ carpool login"} body={createLogin(props)} currentlySelected={0} hide={props.hide} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )
}

export default Login