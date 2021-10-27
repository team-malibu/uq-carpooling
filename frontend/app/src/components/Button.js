import React from 'react'
import './Button.css'


/**
 * returns a small button
 * @param   {string} param1 <props.name>
 * @return  {<button>}        A button with the provided text
 */
function SmallConfirmButton(props) {
  return (
    <button class='button_small green'>
      {props.name}
    </button>);
}

/**
 * returns a medium sized button
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function MediumConfirmButton(props) {

  if (props.margin !== true) {

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

/**
 * returns a large sized button
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function LargeConfirmButton(props) {
  return (
    <button class="button_large green">
      {props.name}
    </button>
  );
}

/**
 * returns a square shaped button
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function SquareButton(props) {
  return (
    <button class="button_square green">
      Find<br />Driver
    </button>
  )
}

/**
 * returns a button for updating the account details
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function AccountUpdateButton(props) {
  return (
   
    <button class='button_account_update'>
      {props.name}
      
    </button>
   
  );
}

/**
 * returns a circruclar shaped button
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function CircleEditButton(props) {
  return (
   
    <button class='button_edit_circle'>
      {props.icon}
      
    </button>
   
  );
}

/**
 * returns a button for the login page which handles login
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function LoginButton(props) {
  return (
    <button class='button_login'>
      {props.name}
    </button>);
}

/**
 * returns a button for the login page which handle account creating
 * @param   {string} param1 <props.name>
 * @return  {<button>}      A button with the provided text
 */
function CreateAccountButton(props) {
  return (
    <button class='button_createAccount'>
      {props.name}
    </button>);
}

export {SmallConfirmButton, MediumConfirmButton, LargeConfirmButton, SquareButton, AccountUpdateButton, CircleEditButton, LoginButton, CreateAccountButton}