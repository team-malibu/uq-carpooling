import React from 'react'
import './SignInButtons.css';
import { Link } from "react-router-dom";


function LoginButton(props) {
  return (
    <Link to='/'>
    <button class='button_login'>
      {props.name}
    </button>
    </Link>);
}

function CreateAccountButton(props) {
  return (
    <Link to='/SignUp'>
    <button class='button_createAccount'>
      {props.name}
    </button>
    </Link>);
}

export {
  LoginButton,
  CreateAccountButton
};