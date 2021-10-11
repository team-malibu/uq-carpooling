import React, {useState} from 'react'
import BasicPage from '../components/BasicPage'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../components/Button'
import './CreateAccount.css'
import { InputPassword, InputEmail, InputName, InputStudentId } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';
import { BsExclamationCircle, BsCheckCircle } from "react-icons/bs"

function CreateAccount2(props) {
  const history = useHistory();

  const[firstName, setFirstName] = useState(null);
  const[validFirstName, setValidFirstName] = useState(false);

  const[lastName, setLastName] = useState(null);
  const[validLastName, setValidLastName] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const[validEmail, setValidEmail] = useState(false);

  const [studentId, setStudentId] = useState(null);
  const [validStudentId, setValidStudentId] = useState(false);
  
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const[validPassword, setValidPassword] = useState(false);
  const[validPassword2, setValidPassword2] = useState(false);

  const[firstNameIcon, setFirstNameIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
  const[lastNameIcon, setLastNameIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
  const[emailIcon, setEmailIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
  const[studentIdIcon, setStudentIdIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
  const[passwordIcon, setPasswordIcon] = useState(<BsExclamationCircle style={{color: 'red'}}/>)
  const[passwordIcon2, setPasswordIcon2] = useState(<BsExclamationCircle style={{color: 'red'}}/>)

  function handleFirstName(thisFirstName, firstNameBool) {
    setFirstName(thisFirstName);
    setValidFirstName(firstNameBool);
    if (firstNameBool) {
      setFirstNameIcon(<BsCheckCircle/>)
    } else {
      setFirstNameIcon(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handleLastName(thisLastName, lastNameBool) {
    setLastName(thisLastName);
    setValidLastName(lastNameBool);
    if (lastNameBool) {
      setLastNameIcon(<BsCheckCircle/>)
    } else {
      setLastNameIcon(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handleEmail(thisEmail, emailBool) {
    setUserEmail(thisEmail)
    setValidEmail(emailBool)
    if (emailBool) {
      setEmailIcon(<BsCheckCircle/>)
    } else {
      setEmailIcon(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handleStudentId(thisStudentId, studentIdBool) {
    setStudentId(thisStudentId)
    setValidStudentId(studentIdBool)
    if (studentIdBool) {
      setStudentIdIcon(<BsCheckCircle/>)
    } else {
      setStudentIdIcon(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handlePassword(thisPassword, passwordBool) {
    setUserPassword(thisPassword)
    setValidPassword(passwordBool)
    if (passwordBool) {
      setPasswordIcon(<BsCheckCircle/>)
    } else {
      setPasswordIcon(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handlePassword2(thisPassword2) {
    setUserPassword2(thisPassword2)
    if (userPassword == thisPassword2 && validPassword) {
      setValidPassword2(true)
      setPasswordIcon2(<BsCheckCircle/>)
    } else {
      setValidPassword2(false)
      setPasswordIcon2(<BsExclamationCircle style={{color: 'red'}}/>)
    }
  }

  function handleSubmission(event) {
    event.preventDefault();
    if (validFirstName && validLastName && validStudentId && validEmail && validPassword && validPassword2) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'first_name': firstName,
          'last_name': lastName,
          'student_id': studentId,
          'email': userEmail,
          'password': userPassword
        })
      };
      fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/sign-up", requestOptions)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        history.push('/Login');
      });
    }
  }

  function createBook2(props) {
    return (
      <>
        <div className="inputFirstName">
          <InputName
            value={firstName}
            onChange={handleFirstName}
            placeholder="First Name"
            iconLeft={<MdLockOutline />}
            iconRight={firstNameIcon}
          />
        </div>
        <div className="inputLastName">
          <InputName
            value={lastName}
            onChange={handleLastName}
            placeholder="Last Name"
            iconLeft={<MdLockOutline />}
            iconRight={lastNameIcon}
          />
        </div>
        <div className="inputEmail">
          <InputEmail
            value={userEmail}
            onChange={handleEmail}
            placeholder="Student Email (uq.net.au)"
            iconLeft={<MdLockOutline />}
            iconRight={emailIcon}
          />
        </div>
        <div className="inputStudentId">
          <InputStudentId
            value={studentId}
            onChange={handleStudentId}
            placeholder="Student Id"
            iconLeft={<MdLockOutline />}
            iconRight={studentIdIcon}
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
        <div className="inputPassword2">
          <InputPassword
            value={userPassword2}
            onChange={handlePassword2}
            placeholder="Re-enter Password"
            iconLeft={<MdLockOutline />}
            iconRight={passwordIcon2}
          />
        </div>
        <div className="submitButton" onClick={handleSubmission}>
          <LargeConfirmButton name="Sign Up" />
        </div>
        <div className='body' id={props.className} />

      </>
    )

  }

  return (

    // <BlankDefaultPage name={"Book"} body={createBook()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"UQ Student Pool Sign Up"} body={createBook2(props)} currentlySelected={0} hide={true} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )
}

export default CreateAccount2
