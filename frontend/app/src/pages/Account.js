import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import { Link } from 'react-router-dom'
import { AccountUpdateButton, CircleEditButton } from '../components/Button'
import { Avatar } from '@material-ui/core';

function Account(props) {

    function createAccountBody() {
        return(
        <div class='awrapper'>
            <Avatar variant='circle' className='acc-avatar' style={{ height: '250px', width: '250px'}} src={props.src} />
            
            <div class='acontainer'>
            Display Name:

            Gender:

            Driver Preference:

            School:
            <Link to='/AccountDetails'>
            <AccountUpdateButton class="acc-update-btn" name="Update Details"/>
            </Link>

            
            </div>

        </div>
        )
    }

    return (
        <BlankDefaultPage currentlySelected={3} body={createAccountBody()} name='Account' hide={true} />
    )
}

export default Account
