import React from 'react';
import * as Buttons from './Button';

function ButtonDisplayPage() {
  return (
    <div>
      <div>
        <Buttons.SmallConfirmButton name='Small'/>
      </div>
      <div>
        <Buttons.MediumConfirmButton name='Medium'/>
      </div>

      <div>
        <Buttons.LargeConfirmButton name='Large'/>
      </div>
      <div>
        <Buttons.SquareButton />
      </div>
    </div>
  )
}

export default ButtonDisplayPage
