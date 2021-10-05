import React from 'react'
import BasicPage from '../components/BasicPage'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../components/Button'
import './CreateAccount2.css'
import { InputPasswordText, InputSignUpText } from '../components/InputText';
import { MdLockOutline } from 'react-icons/md';

function CreateAccount2(props) {
    const history = useHistory();

    function createBook2(props) {
        return (
          <>
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
            <div class='bbbutton' onClick={() => {
          history.push('/Book')}}>
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
