import React, {useState} from 'react'
import BasicPage from '../components/BasicPage'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../components/Button'
import './CreateAccount.css'
import { InputPassword, InputEmail, InputName } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';

function CreateAccount2(props) {
  const history = useHistory();

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

  function createBook2(props) {
    return (
      <>
        <div className="inputName">
          <InputName
            value={userName}
            onChange = {handleName}
            placeholder="Name"
            iconLeft={<MdLockOutline />}
          />
        </div>
        <div className="inputEmail">
          <InputEmail
            value={userEmail}
            onChange={handleEmail}
            placeholder="Student Email"
            iconLeft={<MdLockOutline />}
          />
        </div>
        <div className="inputPassword">
          <InputPassword
            value={userPassword}
            onChange={handlePassword}
            placeholder="Password"
            iconLeft={<MdLockOutline />}
          />
        </div>
        <div class='submitButton' onClick={() => {
          history.push('/Login')
        }}>
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
