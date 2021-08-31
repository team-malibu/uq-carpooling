import React from 'react'
import './SignInButtons.css';


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

export {
  LoginButton,
  CreateAccountButton
};