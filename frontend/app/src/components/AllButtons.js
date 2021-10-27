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
  async function logthisApiBitch(z) {
    let x = "not here yet"
    await fetch("https://deco3801-teammalibu.uqcloud.net/test")
      .then(result => result.json())
      .then(data => {
        x = data;
        console.log("binData", x);
      });
    console.log("Fetched " + x)
  }

  return (
    <button class="button_medium green" onClick={() => logthisApiBitch("Motherfucker")} >
      {props.name}
    </button>
  );
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
function ButtonDisplayPage(props) {
  return (
    <div>
      <div>
        <SmallConfirmButton name='Small' />
      </div>
      <div>
        <MediumConfirmButton name='Medium' />
      </div>

      <div>
        <LargeConfirmButton name='Large' />
      </div>
      <div>
        <SquareButton />
      </div>
    </div>
  )
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
    </button>
  );
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
    </button>
  );
}

export { SmallConfirmButton, MediumConfirmButton, LargeConfirmButton, SquareButton, ButtonDisplayPage, LoginButton, CreateAccountButton }