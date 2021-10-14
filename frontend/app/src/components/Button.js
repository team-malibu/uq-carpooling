import { yellow } from '@material-ui/core/colors';
import React from 'react'
import {EditOutlined} from '@material-ui/icons/'
import './Button.css'

function SmallConfirmButton(props) {
  return (
    <button class='button_small green'>
      {props.name}
    </button>);
}

function MediumConfirmButton(props) {

  if (props.margin != true) {

    return (
    
      <button class="button_medium green" onClick={props.onClick}>
        {props.name}
      </button>
    );
    } else {

      return (
    
        <button class="button_medium_margin green" onClick={props.onClick}>
          {props.name}
        </button>
      );
    }
  
}

function LargeConfirmButton(props) {
  return (
    <button class="button_large green">
      {props.name}
    </button>
  );
}

function SquareButton(props) {
  return (
    <button class="button_square green">
      Find<br />Driver
    </button>
  )
}

function AccountUpdateButton(props) {
  return (
   
    <button class='button_account_update'>
      {props.name}
      
    </button>
   
  );
}

function CircleEditButton(props) {
  return (
   
    <button class='button_edit_circle'>
      {props.icon}
      
    </button>
   
  );
}

function LoginButton(props) {
  return (
    <button class='button_login'>
      {props.name}
    </button>);
}

function CreateAccountButton(props) {
  return (
    <button class='button_createAccount'>
      {props.name}
    </button>);
}

export {SmallConfirmButton, MediumConfirmButton, LargeConfirmButton, SquareButton, AccountUpdateButton, CircleEditButton, LoginButton, CreateAccountButton}