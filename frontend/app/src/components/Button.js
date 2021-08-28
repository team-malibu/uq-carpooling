import React from 'react'
import './Button.css'

function SmallConfirmButton(props) {
  return (
    <button class='button_small green'>
      {props.name}
    </button>);
}

function MediumConfirmButton(props) {
  return (
    <button class="button_medium green">
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

function SquareButton() {
  return (
    <button class="button_square green">
      Find<br />Driver
    </button>
  )
}

export {SmallConfirmButton, MediumConfirmButton, LargeConfirmButton, SquareButton}