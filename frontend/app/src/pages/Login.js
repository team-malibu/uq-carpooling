import React, {useState} from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import { useHistory, Link } from 'react-router-dom';
import { InputPassword, InputEmail } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';
import BasicPage from '../components/BasicPage';

function Login(props) {
    const history = useHistory();

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function handleEmail(thisEmail) {
        setUserEmail(thisEmail)
    }

    function handlePassword(thisPassword) {
        setUserPassword(thisPassword)
    }

    function createLogin() {
        return (
            <>
                <div className='login-body'>
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
                    <div className="loginButton" onClick={() => {
                        history.push('/Book')}}>
                        <LoginButton name="Login" />
                    </div>
                    <div class='loginButton' onClick={() => {
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