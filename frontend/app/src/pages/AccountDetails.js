import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import { AccountUpdateButton } from '../components/Button'
import { Avatar } from '@material-ui/core';
import {InputStandardText} from '../components/InputText';
import {FaPen} from 'react-icons/fa';
import { CircleEditButton } from '../components/Button'
import {DriverDropDownMenu, GenderDropDownMenu, SchoolDropDownMenu} from '../components/DropDownMenu';

function AccountDetails(props) {

    function createAccountBody() {
        return(
        <div class='acc-detail-wrapper'>
            <div class="acc-detail-image-container">
            <Avatar variant='circle' className='acc-detail-avatar' style={{ height: '250px', width: '250px'}} src={props.src} />
            <CircleEditButton className= "acc-detail-circle-btn" icon={<FaPen/>} />
            </div>
            DisplayName:
            <div class='acontainer'>

            <InputStandardText placeholder='Enter your name' iconRight={<FaPen/>}/>
           
            Gender:
            
            <GenderDropDownMenu/>
            
            Preference:
           
            <DriverDropDownMenu />
            
            School:
            
            <SchoolDropDownMenu />

            </div>

        </div>
        )
    }

    return (
        <BlankDefaultPage currentlySelected={3} body={createAccountBody()} name='Account Details' hide={true} />
    )
}

export default AccountDetails