import React from 'react';
import './SignUp.css'
import * as Buttons from '../components/Button';
import PlainBackground from '../components/PlainBackground';
import { useHistory, Link } from 'react-router-dom';
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
                <Link to='/Book' className="submitButton"
                    onClick={() => {
                        history.push('/book')
                        console.log("link clicked")
                    }}>

                        <Buttons.MediumConfirmButton name="Submit" />
                        
                    </Link>

                </div>
            </div>



    )
}

export default SignUp
