import React, { useState } from 'react';
import BasicPage from '../components/BasicPage'
import './Search.css'
import { motion } from "framer-motion";
import { MediumConfirmButton, SquareButton } from '../components/Button'
import TimetableTile from '../components/TimetableTile';
import TimeTile from '../components/TimeTile'
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'

function Switch({ isUpcoming, ...props}) {
    const className = `switch ${isUpcoming ? "on" : "off"}`;

    return (
        <motion.div animate className={className} {...props}>
          <motion.div animate />
        </motion.div>
      );
}

function PastTripTile(props) {
  return (
    <>
    <div class='ttilewrapper'>
     <div class='tt_info_line'>
       <div class='tt_content'>
         <div>
           <ScheduleOutlined />
         </div>
         <div class='tt_input_text'>
           {props.event.start}
         </div>
       </div>

     </div>

     <div class='tt_info_line'>
       <div class='tt_content'>
         <div >
           <SchoolOutlined />
         </div>
         <div class='tt_input_text'>
           {props.event.name.split(' ')[0] + ' ' +  props.event.desc}
         </div>
       </div>
     </div>

     <div class='tt_info_line'>
       <div class='tt_content'>
         <div >
           <PlaceOutlined />
         </div>
         <div class='tt_input_text'>
           {props.event.location}
         </div>
       </div>
     </div>

   </div>
 </>  
  )
}
function Upcoming(props) {
  return(
    <div>
      <div class='ttimetable'>
        <pre class='tdatetext'>Date</pre>
      </div>
      <div class='timeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
      </div>
      <div class='ttimetable'>
        <pre class='tdatetext'>Date</pre>
      </div>
      <div class='timeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
      </div>
        </div>
      )
}

function Past(props) {
  return(
    <div>
    <div class='ttimetable'>
          <pre class='tdatetext'>Date</pre>
        </div>
        <div class='timeitems'>
          <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
          <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
          <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
        </div>
        <div class='ttimetable'>
          <pre class='tdatetext'>Date</pre>
        </div>
        <div class='timeitems'>
          <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
          <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} />
        </div>
      </div>
      )
}
function Search(props) {
    const [selectedId, setSelectedId] = useState(null)
    const [tripType, setTripType] = useState('Upcoming')
    const [isOn, setIsOn] = useState(false);
    const [isUpcoming, setIsUpcoming] = useState(false);
    


    
    function SearchBody(props) {
        //const items = [0, 1, 2];
        return (
          <>
          <Switch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}> 
          <div>Text</div>
          </Switch>
          
          {/* <div className='trip-type-switch'>
            <div className='upcoming'>
                <div className='text-div'>Date</div>
            </div>
            <div className='past'>Past</div>

          </div> */}
          {isUpcoming ? <Upcoming /> : <Past />}
          </>
        )
    }
        
        
        
    
    
    return (
        // <BlankDefaultPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody}/>
        <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
    )
}

export default Search
