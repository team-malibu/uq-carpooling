import React from 'react';
import './SignUp.css'
import * as Buttons from '../components/Button';
import { UserInfoInput } from '../components/UserInfoInput';
import PlainBackground from '../components/PlainBackground';
import {useHistory} from 'react-router-dom'
import { InputPasswordText, InputSignUpText } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';


function SignUp() {
  const history = useHistory();

    return (
        <div class='suwrapper'>
            <PlainBackground />

                <div className='subody'>
                    <div className="signup-top">
                        <h1>
                            UQ Student Pool SignUp
                        </h1>
                    </div>

                    <div className="inputName">
                        <InputSignUpText
                            placeholder="Name"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>
                    <div className="inputEmail">
                    <InputSignUpText
                            placeholder="Email"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>
                    <div className="inputPassword">
                        <InputPasswordText
                            placeholder="Password"
                            iconLeft={<MdLockOutline />}
                        />
                    </div>
                    <div className="submitButton" onClick = {() => history.push('/book')}>

                        <Buttons.MediumConfirmButton name="Submit" />
                    </div>

                </div>
            </div>



    )
}

export default SignUp
