
import React from 'react'
import './Button.css'

function SmallConfirmButton(props) {
  return (
    <button class='button_small green'>
      {props.name}
    </button>);
}

function MediumConfirmButton(props) {
  async function logthisApiBitch (z) {
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

function ButtonDisplayPage(props) {
    return (
      <div>
        <div>
          <SmallConfirmButton name='Small'/>
        </div>
        <div>
          <MediumConfirmButton name='Medium'/>
        </div>
  
        <div>
          <LargeConfirmButton name='Large'/>
        </div>
        <div>
          <SquareButton />
        </div>
      </div>
    )
  }

function LoginButton(props) {
    return (
        <button class='button_login'>
        {props.name}
        </button>
    );
}

function CreateAccountButton(props) {
    return (
        <button class='button_createAccount'>
        {props.name}
        </button>
    );
}

export {SmallConfirmButton, MediumConfirmButton, LargeConfirmButton, SquareButton, ButtonDisplayPage, LoginButton, CreateAccountButton}