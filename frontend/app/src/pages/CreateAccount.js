import React, {useState} from 'react'
import BasicPage from '../components/BasicPage'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../components/Button'
import './CreateAccount.css'
import { InputPassword, InputEmail, InputName } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"

function CreateAccount2(props) {
  const history = useHistory();

  const[validEmail, setValidEmail] = useState(false)
  const[validPassword, setValidPassword] = useState(false);
  const[validPassword2, setValidPassword2] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");

  const[emailIcon, setEmailIcon] = useState(<BsExclamationCircle/>)
  const[passwordIcon, setPasswordIcon] = useState(<BsExclamationCircle/>)
  const[passwordIcon2, setPasswordIcon2] = useState(<BsExclamationCircle/>)


  function handleEmail(thisEmail, emailBool) {
    setUserEmail(thisEmail)
    setValidEmail(emailBool)
    if(emailBool) {
        setEmailIcon(<BsCheckCircle/>)
    } else {
      setEmailIcon(<BsExclamationCircle/>)
    }
}

  function handlePassword(thisPassword, passwordBool) {
    setUserPassword(thisPassword)
    setValidPassword(passwordBool)
    if(passwordBool) {
        setPasswordIcon(<BsCheckCircle/>)
    } else {
      setPasswordIcon(<BsExclamationCircle/>)
    }
  }

  function handlePassword2(thisPassword2) {
    setUserPassword2(thisPassword2)
    if(userPassword == thisPassword2 && validPassword) {
      setValidPassword2(true)
      setPasswordIcon2(<BsCheckCircle/>)
    } else {
      setValidPassword2(false)
      setPasswordIcon2(<BsExclamationCircle/>)
    }
  }

  function createBook2(props) {
    return (
      <>
        <div className="input-field-sign-up">
          <InputEmail
            value={userEmail}
            onChange={handleEmail}
            placeholder="Student Email (uq.net.au)"
            iconLeft={<MdLockOutline />}
            iconRight={emailIcon}
          />
        </div>
        <div className="input-field-sign-up">
          <InputPassword
            value={userPassword}
            onChange={handlePassword}
            placeholder="Password"
            iconLeft={<MdLockOutline />}
            iconRight={passwordIcon}
          />
        </div>
        <div className="input-field-sign-up">
          <InputPassword
            value={userPassword2}
            onChange={handlePassword2}
            placeholder="Re-enter Password"
            iconLeft={<MdLockOutline />}
            iconRight={passwordIcon2}
          />
        </div>
        <div class='submitButton' onClick={() => {
          history.push('/Book')
        }}>
          <LargeConfirmButton name="Sign Up" />
        </div>
        <div className='body' id={props.className} />

      </>
    )

  }

  return (

    <BasicPage name={"UQ Student Pool Sign Up"} body={createBook2(props)} currentlySelected={0} hide={true} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )
}

export default CreateAccount2
