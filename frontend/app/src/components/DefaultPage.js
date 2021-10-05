import React from 'react'
import './DefaultPage.css'

function BackgroundContainer() {
    return (
        <div className='Background'>
            <svg class="Backgorund_bn">
                <linearGradient id="Backgorund_bn" spreadMethod="pad" x1="1.309" x2="-0.034" y1="-0.434" y2="1.038">
                    <stop offset="0" stop-color="#8000ff" stop-opacity="1"></stop>
                    <stop offset="0.6054" stop-color="#37a7f2" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#4ce2e2" stop-opacity="1"></stop>
                </linearGradient>
                <rect id="Backgorund_bn" rx="0" ry="0" x="0" y="0" width="375" height="812">
                </rect>
            </svg>
            <svg class="Rectangle_314">
                <rect id="Rectangle_314" rx="0" ry="0" x="0" y="0" width="375" height="741">
                </rect>
            </svg>
        </div>
    );
}

function TopSection(props) {
    return (
        <>
        <div className='top'>
            {!props.hide && 
            <div to={props.previousPage} className='back-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" className='back-arrow' width="25" height="25" viewBox="0 0 25 25" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    <path id="Path_27" data-name="Path 27" d="M29,14.937H9.984L18.719,6.2,16.5,4,4,16.5,16.5,29l2.2-2.2L9.984,18.062H29Z" transform="translate(-4 -4)" fill="#462963"
                         />
                </svg>
            </div>
            }

            <h1 className='page-title'>{props.name}</h1>
        </div>
      </>
    );
}

function DefaultPage(props) {
    return (
        <>
            <BackgroundContainer />
            <div className='page-wrapper'>
                <TopSection name={props.name} previousPage={props.previousPage} hide={props.hide} currentlySelected={props.currentlySelected}/>
                <div className='body'> 
                    {props.body}
                </div>
            </div>
        </>
    )
}

export default DefaultPage
