import React, {useState} from 'react'


import { Avatar } from '@material-ui/core';
import { InputName } from '../../components/InputText';
import { FaPen } from 'react-icons/fa';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"
import { CircleEditButton, MediumConfirmButton, SmallConfirmButton } from '../../components/Button'
import { DriverDropDownMenu, GenderDropDownMenu, SchoolDropDownMenu } from '../../components/DropDownMenu';
import BasicPage from '../../components/BasicPage';
import "./AccountDetails.css";
const ical = require('node-ical');

function AccountDetails(props) {

  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameIcon, setNameIcon] = useState(<BsExclamationCircle/>);

  const[userGender, setUserGender] = useState("")
  const[driverPref, setDriverPref] = useState("")
  const[userSchool, setUserSchool] = useState("")
  
 
  function handleName(thisName, nameBool) {
    setUserName(thisName)
    setValidName(nameBool)
    if(nameBool) {
        setNameIcon(<BsCheckCircle/>)
    } else {
      setNameIcon(<BsExclamationCircle/>)
    }
  }

  function handleGender(thisGender) {
    setUserGender(thisGender);
  }

  function handleDriverPref(thisDriverPref) {
    setDriverPref(thisDriverPref);
  }

  function handleSchool(thisSchool) {
    setUserSchool(thisSchool);
    console.log(thisSchool)
  }




  var classes = new Map();

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }


  const handleFile = (e) => {
    const content = e.target.result;
    const events = ical.parseICS(content);
    console.log(events)
    for (const event of Object.values(events)) {
      classes.set(event.start.toISOString().split('T')[0], {
        'name': event.summary.val,
        'desc': event.description,
        'location': event.location,
        'start': event.start.toDateString() + ' ' + event.start.toLocaleTimeString(),
        'end': event.end.toDateString() + ' ' + event.end.toLocaleTimeString(),
      })

    }

    for (let unit of classes.values()) {
      console.log(unit)
    }

    // You can set content in state and show it in render.
  }

  function createAccountBody() {

    return (
      <div className='acc-detail-wrapper'>
        <div className="acc-detail-image-container">
          <Avatar variant='circle' className='acc-detail-avatar' style={{ height: '250px', width: '250px', marginLeft: '15%', position: "relative" }} src={props.src} onClick={() => {
            console.log('Avatar pressed display image picker')
          }} />
        </div>

        <div className='ad-container'>
          Display Name:

          <InputName 
          placeholder='Enter your name' 
          value = {userName}
          onChange = {handleName}
          iconLeft={<FaPen />}
          iconRight={nameIcon} />

          Gender:

          <GenderDropDownMenu
          value = {userGender}
          handleChange = {handleGender} />

          Preference:

          <DriverDropDownMenu
          value = {driverPref}
          handleChange = {handleDriverPref} />

          School:

          <SchoolDropDownMenu
          value = {userSchool}
          handleChange = {handleSchool} />

          Timetable:
          <div>
          <input type="file" accept=".ics" onChange={e =>
            handleChangeFile(e.target.files[0])} />
        </div>


          <MediumConfirmButton margin={true} onClick={() => {
            console.log('Send the updated fields to the Database')
          }} name={'SAVE'} />

        </div>

      </div>
    )
  }

  return (
    <BasicPage currentlySelected={3} body={createAccountBody()} name='Account Details' hide={true} />
  )
}

export default AccountDetails