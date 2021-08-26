import React from 'react'
import './Button.css'

function SmallConfirmButton() {
  return (
    <button class='button_small green'>
      Small Confirm
    </button>);
}

function MediumConfirmButton() {
  return (
    <button class="button_medium green">
      Medium Confirm
    </button>
  );
}

function LargeConfirmButton() {
  return (
    <button class="button_large green">
      Large Confirm
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