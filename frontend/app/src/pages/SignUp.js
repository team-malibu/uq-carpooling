import React, { useState } from 'react';
import './SignUp.css'
import * as Buttons from '../components/Button';
import PlainBackground from '../components/PlainBackground';
import { useHistory, Link } from 'react-router-dom';
import { InputPassword, InputEmail, InputName } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';


function SignUp() {
    const history = useHistory();

    const [validCredentials, setValideCrendentials] = useState(false)
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");

    function handleEmail(thisEmail) {
        setUserEmail(thisEmail)
    }

    function handlePassword(thisPassword) {
        setUserPassword(thisPassword)
    }

    function handleName(thisUser) {
        setUserName(thisUser)
    }


    return (
        <div class='suwrapper'>

            <PlainBackground />

            <div className='subody'>
                <div className="signup-top">
                    <h1>
                        Sign Up
                    </h1>
                </div>

                <div className="sign-inputName">
                    <InputName
                        value={userName}
                        onChange = {handleName}
                        placeholder="Name"
                        iconLeft={<MdLockOutline />}
                    />
                </div>
                <div className="sign-inputEmail">
                    <InputEmail
                        value = {userEmail}
                        onChange = {handleEmail}
                        placeholder="Student Email"
                        iconLeft={<MdLockOutline />}
                    />
                </div>
                <div className="sign-inputPassword">
                    <InputPassword
                       value = {userPassword}
                       onChange = {handlePassword}
                       placeholder="Password"
                       iconLeft={<MdLockOutline />}
                    />
                </div>
                <Link to='/Book' className="submitButton"
                    onClick={() => {
                        history.push('/book')
                        console.log("link clicked")
                    }}>

                    <Buttons.SmallConfirmButton name="Submit" />

                </Link>

            </div>

        </div>



    )
}

export default SignUp
