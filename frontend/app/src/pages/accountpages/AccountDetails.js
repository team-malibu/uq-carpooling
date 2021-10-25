import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import FileBase64 from 'react-file-base64'
import { Avatar} from '@material-ui/core';
import { AiFillHome } from 'react-icons/ai';
import { MediumConfirmButton } from '../../components/Button'
import {InputCarDetails, InputCarRego} from '../../components/InputText'
import { TimingDropDownMenu, DriverDropDownMenu, GenderDropDownMenu, SchoolDropDownMenu } from '../../components/DropDownMenu';
import BasicPage from '../../components/BasicPage';
import "./AccountDetails.css";
import Geocoder from 'react-mapbox-gl-geocoder';
const ical = require('node-ical');

function AccountDetails(props) {
  

  const [userItems, setUserItems] = useState();

  var thisStudentId = props.studentId
  
  useEffect(() => {
      const prerenderOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'student_id': thisStudentId,
          //'student_id': "s1243456",  
        })
      };
  
      fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user-details", prerenderOptions)
        .then(result => result.json())
        .then(data => {
          setUserItems({data});  
                 
        });
       }, [thisStudentId]);

        if (props.studentId == null) {
          props.update_direction(0);
          return (<Redirect to="/" />);
        }

        return (
          <>
            {userItems && <AccountDetailsChild userItems={userItems} thisStudentId={thisStudentId}/>}
          </>
        )
}


function AccountDetailsChild(props) {
  const childProps = props.userItems.data;
  var img = null;
    if (props.userItems.data.user_avatar != null) {
      const  { data } = props.userItems.data.user_avatar;
      img = new Buffer.from(data).toString("ascii");
    }

  const [userGender, setUserGender] = useState(props.userItems.data.gender);
  const [driverPref, setDriverPref] = useState(props.userItems.data.preference);
  const [userSchool, setUserSchool] = useState(props.userItems.data.school);
  const [userArrivalTime, setUserArrivalTime] = useState( props.userItems.data.arrive_time_preference);
  const [userImage, setUserImage] = useState((img));
  const [userRego, setUserRego] = useState(props.userItems.data.number_plate? props.userItems.data.number_plate: "" );
  const [carModel, setCarModel] = useState(props.userItems.data.car_type? props.userItems.data.car_type: "" );
  const [home_location, setHomeLocation] = useState("");
  const [home_coords, setHomeCoords] = useState(0);

  var student_id = props.thisStudentId

  let locationSearchUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Brisbane.json?access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q&proximity=153.01182776135374%2C-27.500061086853854&bbox=152.91750879139477%2C-27.670452156811677%2C153.20513988226412%2C-27.33132423232297&limit=5"
  const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"

  function handleGender(thisGender) {
    setUserGender(thisGender);
  }

  function handleDriverPref(thisDriverPref) {
    setDriverPref(thisDriverPref);
  }

  function handleArrivalTime(thisArrivalTime) {
    setUserArrivalTime(thisArrivalTime);
  }

  function handleSchool(thisSchool) {
    setUserSchool(thisSchool);
  }

  function handleUserRego(thisRego) {
    setUserRego(thisRego)
  }

  function handleCarModel(thisCarModel) {
    setCarModel(thisCarModel)
  }

  const handleDropDowns = () => {

    let input = (document.getElementById("startingGeo").childNodes[1].childNodes[0]);
    console.log(home_coords)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'student_id': student_id,
        'gender': userGender,
        'preference': driverPref,
        'school': userSchool,
        'arrive_time_preference': userArrivalTime,
        "home_address": input.value,
        "home_location": home_location,
        "home_lat": home_coords[0],
        "home_long": home_coords[1],
        "number_plate": userRego,
        "car_type": carModel,
        "user_avatar" : userImage

      })
    };

    fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/update-user", requestOptions)
      .then(result => result.json())
      .then(data => {
      });
  }

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const handleFile = async (e) => {

    // Delete old timetable events
    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'student_id': student_id,
      })
    };

    await fetch("https://deco3801-teammalibu.uqcloud.net/db/timetables/delete-events", deleteOptions)
      .then(result => result.json())
      .then(data => {

        console.log(data);
      });

    // Add new timetable events
    const content = e.target.result;
    const events = ical.parseICS(content);
    for (const event of Object.values(events)) {
      console.warn(event)

      var start_split = event.start.toLocaleString('en-GB').split(',')[0].trim().split('/')
      var start_date = start_split[2] + '-' + start_split[1] + '-' + start_split[0]
      var start_time = event.start.toLocaleTimeString('en-GB').split(' ')[0];
      console.log(event.start.toLocaleString('en-GB'))

      var end_split = event.end.toLocaleString('en-GB').split(',')[0].trim().split('/')
      var end_date = end_split[2] + '-' + end_split[1] + '-' + end_split[0]
      var end_time = event.end.toLocaleTimeString('en-GB').split(' ')[0];

      const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'student_id': student_id,
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
  }

  function createAccountBody() {
    return (
      <div className='acc-detail-wrapper'>
        <div className="acc-detail-image-container">
          <Avatar variant='circular' className='acc-detail-avatar' style={{ height: '250px', width: '250px' }} src={userImage} onClick={() => {
            console.log('Avatar pressed display image picker')
          }} />
           <FileBase64 multiple={false} onDone={convertedImage => setUserImage(convertedImage.base64)} />
        </div>

        <div className='ad-container'>

          <div>
            Driver Rating: {childProps.average_rating}
          </div>

          <div onClick={handleDropDowns}>
            <MediumConfirmButton margin={true} name={'Update Preferences'} />
          </div>

          Gender:

          <GenderDropDownMenu
            genderValue={userGender}
            handleChange={handleGender} />

          Home Location:
          <div class='ad_trip_wrapper'>
            <div class='ad_trip_info_line'>
              <div class='ad_trip_content' id="startingGeo">
              <div>
                {<AiFillHome />}
                </div>
                <Geocoder
                  mapboxApiAccessToken={access_token}
                  onSelected={(markerProps, event) => {
                    setHomeLocation(event.text);
                    setHomeCoords([Number(markerProps.longitude), Number(markerProps.latitude)]);
                  }}
                  hideOnSelect={true}
                  queryParams={locationSearchUrl}
                  initialInputValue={props.userItems.data.home_address}
                  updateInputOnSelect={true}
                  id="startingGeo"
                />
               
              </div>


            </div>
          </div>

          Driver Preference:

          <DriverDropDownMenu
            driverPrefValue={driverPref}
            handleChange={handleDriverPref} />

          Arrival Time before class:

          <TimingDropDownMenu
            arrivalTimeValue={userArrivalTime}
            handleChange={handleArrivalTime} />

          School:

          <SchoolDropDownMenu
            schoolValue={userSchool}
            handleChange={handleSchool} />

          Car Number Plate:

          <InputCarRego
            value={userRego}
            onChange={handleUserRego}
            placeholder={userRego}
            iconRight={null}
          />

          Car Description:

          <InputCarDetails
            value={carModel}
            onChange={handleCarModel}
            placeholder={carModel}
            iconRight={null}
          />


          Timetable:
          {/*  TODO:  Change it so on changeFile it saves it to the State and on Save it sends to the DB*/}
          <div>
            <input type="file" accept=".ics" onChange={e =>
              handleChangeFile(e.target.files[0])} />
          </div>

          <div onClick={handleFile}>
            <MediumConfirmButton margin={true} name={'SAVE'} />

          </div>


        </div>

      </div>
    )
  }

  return (
    <BasicPage currentlySelected={3} body={createAccountBody()} name='Account Details' hide={true} />
  )
}

export default AccountDetails