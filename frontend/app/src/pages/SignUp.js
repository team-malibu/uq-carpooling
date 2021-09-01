import React from 'react';
import './SignUp.css'
import * as Buttons from '../components/Button';
import { UserInfoInput } from '../components/UserInfoInput';
import PlainBackground from '../components/PlainBackground';
import {useHistory} from 'react-router-dom'


function SignUp() {
  const history = useHistory();

    return (
        <div class='suwrapper'>
            <PlainBackground />

                <div className='subody'>


                    <div className="inputName">
                        <UserInfoInput type="text"
                            className="form-control"
                            id="name"
                            //value={email}
                            //onChange={}
                            placeholder="Name"

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
                    <div className="submitButton" onClick = {() => history.push('/book')}>

                        <Buttons.MediumConfirmButton name="Submit" />
                    </div>

                </div>
            </div>



    )
}

export default SignUp
