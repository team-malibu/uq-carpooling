import React from 'react';
import './SignUp.css'
import * as Buttons from '../components/Button';
import { UserInfoInput } from '../components/UserInfoInput';
import PlainBackground from '../components/PlainBackground';
import { useHistory, Link } from 'react-router-dom'


function SignUp() {
  const history = useHistory();

    return (
        <div class='suwrapper'>
            <PlainBackground />

                <div className='subody'>
                    <div className="login-top">
                        <h1>
                            UQ Student Pool Login
                        </h1>
                    </div>

                    <div className="inputName">
                        <UserInfoInput type="text"
                            className="form-control"
                            id="name"
                            //value={email}
                            //onChange={}
                            placeholder="Student ID"

                        />
                    </div>
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
                    <Link to='/Book' className="submitButton" onClick = {() => {
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
