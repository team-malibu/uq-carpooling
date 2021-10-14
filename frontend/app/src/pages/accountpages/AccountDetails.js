import React, { useState } from 'react'


import { Avatar } from '@material-ui/core';
import { InputName } from '../../components/InputText';
import { FaPen } from 'react-icons/fa';
import { BsExclamationCircle, BsCheckCircle } from "react-icons/bs"
import { CircleEditButton, MediumConfirmButton, SmallConfirmButton } from '../../components/Button'
import { DriverDropDownMenu, GenderDropDownMenu, SchoolDropDownMenu } from '../../components/DropDownMenu';
import BasicPage from '../../components/BasicPage';
import "./AccountDetails.css";
const ical = require('node-ical');

function AccountDetails(props) {

  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameIcon, setNameIcon] = useState(<BsExclamationCircle />);

  const [userGender, setUserGender] = useState("")
  const [driverPref, setDriverPref] = useState("")
  const [userSchool, setUserSchool] = useState("")


  function handleName(thisName, nameBool) {
    setUserName(thisName)
    setValidName(nameBool)
    if (nameBool) {
      setNameIcon(<BsCheckCircle />)
    } else {
      setNameIcon(<BsExclamationCircle />)
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

    // Delete old timetable events
    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'student_id': '12345678',
      })
    };

    fetch("https://deco3801-teammalibu.uqcloud.net/db/timetables/delete-events", deleteOptions)
      .then(result => result.json())
      .then(data => {

        console.log(data);
      });

    // Add new timetable events
    const content = e.target.result;
    const events = ical.parseICS(content);
    for (const event of Object.values(events)) {
      console.warn(event)

      var start_split = event.start.toLocaleString().split(',')[0].trim().split('/')
      var start_date = start_split[2] + '-' + start_split[1] + '-' + start_split[0]
      var start_time = event.start.toLocaleTimeString();
      var end_split = event.end.toLocaleString().split(',')[0].trim().split('/')
      var end_date = end_split[2] + '-' + end_split[1] + '-' + end_split[0]
      var end_time = event.end.toLocaleTimeString();
      


      const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'student_id': '12345678',
          'name': event.summary.val,
          'description': event.description,
          'location': event.location,
          'start': start_date + ' ' + start_time,
          'end': end_date + ' ' + end_time,
        })
      };

      fetch("https://deco3801-teammalibu.uqcloud.net/db/timetables/add-event", postOptions)
        .then(result => result.json())
        .then(data => {
          console.log(data);
        });
    }

    // for (let unit of classes.values()) {
    //   console.log(unit)
    // }

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
            value={userName}
            onChange={handleName}
            iconLeft={<FaPen />}
            iconRight={nameIcon} />

          Gender:

          <GenderDropDownMenu
            value={userGender}
            handleChange={handleGender} />

          Preference:

          <DriverDropDownMenu
            value={driverPref}
            handleChange={handleDriverPref} />

          School:

          <SchoolDropDownMenu
            value={userSchool}
            handleChange={handleSchool} />

          Timetable:
          {/*  TODO:  Change it so on changeFile it saves it to the State and on Save it sends to the DB*/}
          <div>
            <input type="file" accept=".ics" onChange={e =>
              handleChangeFile(e.target.files[0])} />
          </div>


          <MediumConfirmButton margin={true} onClick={handleFile} name={'SAVE'} />

        </div>

      </div>
    )
  }

  return (
    <BasicPage currentlySelected={3} body={createAccountBody()} name='Account Details' hide={true} />
  )
}

export default AccountDetails