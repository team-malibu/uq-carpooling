import React from 'react';
import * as Buttons from './Button';

function ButtonDisplayPage() {
  return (
    <div>
      <div>
        <Buttons.SmallConfirmButton />
      </div>
      <div>
        <Buttons.MediumConfirmButton />
      </div>

      <div>
        <Buttons.LargeConfirmButton />
      </div>
      <div>
        <Buttons.SquareButton />
      </div>
    </div>
  )
}

export default ButtonDisplayPage
