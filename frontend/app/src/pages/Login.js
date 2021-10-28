import React, { useState } from 'react';
import './Login.css'
import { LoginButton, CreateAccountButton } from '../components/AllButtons';
import { useHistory } from 'react-router-dom'; //Utilising the react-router library for navigation assist from https://www.npmjs.com/package/react-router 
import { InputPassword, InputEmail } from '../components/InputText';
import { BsExclamationCircle, BsCheckCircle } from "react-icons/bs"; //Utilising the icon library from https://www.npmjs.com/package/react-icons
import { MdLockOutline } from 'react-icons/md'; //Utilising the icon library from https://www.npmjs.com/package/react-icons
import BasicPage from '../components/BasicPage';

/**
 * The Login page allows the user to enter their student email and password.
 * If the user's credentials are correct and adhere to the input requirements
 * they may login. A pop up message will appear otherwise.
 */
function Login(props) {
  const history = useHistory();

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [emailIcon, setEmailIcon] = useState(<BsExclamationCircle style={{ color: 'red' }} />);
  const [passwordIcon, setPasswordIcon] = useState(<BsExclamationCircle style={{ color: 'red' }} />);

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  /**
* Adjusts boolean value of pop up hook
*/
  function togglePopUp() {
    setShowPopUp(false);
  }

  /**
  * Receives values from child function and updates
  * the state in the relevant hooks
  */
  function handleEmail(thisEmail, emailBool) {
    setUserEmail(thisEmail)
    setValidEmail(emailBool)
    if (emailBool) {
      setEmailIcon(<BsCheckCircle />)
    } else {
      setEmailIcon(<BsExclamationCircle style={{ color: 'red' }} />)
    }
  }

  /**
  * Receives values from child function and updates
  * the state in the relevant hooks
  */
  function handlePassword(thisPassword) {
    setUserPassword(thisPassword)
    if (thisPassword.length >= 7) {
      setValidPassword(true);
      setPasswordIcon(<BsCheckCircle />)
    } else {
      setValidPassword(false);
      setPasswordIcon(<BsExclamationCircle style={{ color: 'red' }} />)
    }
  }

  /**
  * Receives values from child function and updates
  * the state in the relevant hooks
  */
  function handleSubmission(event) {
    event.preventDefault();
    if (validEmail && validPassword) {
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
            props.setStudentId(data.studentId)
            history.push({
              pathname: '/Book',
              state: {
                id: data.studentId,
              }
            });
          } else {
            setPopUpMessage(data.message);
            setShowPopUp(true);
          }
        });
    } else {
      setPopUpMessage("Email or Password is Invalid");
      setShowPopUp(true);
    }
  }

  /**
  * Renders the login components and updates them whenever there is a state change.
  * Input Values are passed down to child components. 
  */
  function createLogin() {
    return (
      <>
        <div className='login-body'>
          <div>
            <div className="inputEmail">
              <InputEmail
                value={userEmail}
                onChange={handleEmail}
                placeholder="Student Email (uq.net.au)"
                iconLeft={<MdLockOutline />}
                iconRight={emailIcon}
              />
            </div>
            <div className="inputPassword">
              <InputPassword
                value={userPassword}
                onChange={handlePassword}
                placeholder="Password"
                iconLeft={<MdLockOutline />}
                iconRight={passwordIcon}
              />
            </div>
          </div>
          <div>
            <div className="loginButton" onClick={handleSubmission}>
              <LoginButton name="Login" />
            </div>
            <div className='loginButton' onClick={() => {
              history.push('/Signup')
            }}>
              <CreateAccountButton name="Create Account" />
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <BasicPage name={"UQ carpool login"} body={createLogin(props)} currentlySelected={0}
      hide={props.hide} direction={props.direction} default={props.default} key={props.key}
      custom={props.custom} showPopUp={showPopUp} togglePopUp={togglePopUp} popUpMessage={popUpMessage} />

  )
}

export default Login