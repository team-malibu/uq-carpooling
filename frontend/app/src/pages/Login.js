import React, {useState} from 'react';
import './Login.css'
import {LoginButton, CreateAccountButton} from '../components/AllButtons';
import { useHistory, Link } from 'react-router-dom';
import { InputPassword, InputEmail } from '../components/InputText';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"
import { MdLockOutline } from 'react-icons/md';
import BasicPage from '../components/BasicPage';

function Login(props) {
    const history = useHistory();

    const[isLoggedIn, setIsLoggedIn] = useState(false);

    const[validEmail, setValidEmail] = useState(false)

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const[emailIcon, setEmailIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
    const[passwordIcon, setPasswordIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)

    function handleEmail(thisEmail, emailBool) {
          setUserEmail(thisEmail)
          setValidEmail(emailBool)
          if(emailBool) {
            setEmailIcon(<BsCheckCircle/>)
          } else {
            setEmailIcon(<BsExclamationCircle style={{color: 'red'}}/>)
          }
    }

    function handlePassword(thisPassword) {
        setUserPassword(thisPassword)
        if(thisPassword.length >= 7) {
            setPasswordIcon(<BsCheckCircle/>)
        } else {
            setPasswordIcon(<BsExclamationCircle style={{color: 'red'}}/>)
        }
    }

    function handleSubmission(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              'email': userEmail,
              'password': userPassword
            })
          };
          fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/login", requestOptions)
          .then(result => result.json())
          .then(data => {
            if (data.result) {
              history.push('/Book');
            } else {
              alert(data.message);
            }
          });
    }

    function createLogin() {
        return (
            <>
                <div className='login-body'>
                    <div className="inputEmail">
                        <InputEmail
                            value = {userEmail}
                            onChange = {handleEmail}
                            placeholder="Student Email (uq.net.au)"
                            iconLeft={<MdLockOutline />}
                            iconRight={emailIcon}
                        />
                    </div>
                    <div className="inputPassword">
                        <InputPassword
                            value = {userPassword}
                            onChange = {handlePassword}
                            placeholder="Password"
                            iconLeft={<MdLockOutline />}
                            iconRight={passwordIcon}
                        />
                    </div>
                    <div className="loginButton" onClick={handleSubmission}>
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