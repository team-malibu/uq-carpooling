import React from 'react'
import './BlankDefaultPage.css'
import Navbar from './Navbar.js'

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
        <div className='top'>
            <h1 className='page-title'>{props.name}</h1>
        </div>
    );
}

function BlankDefaultPage(props) {
    return (
        <>
            <BackgroundContainer />
            <TopSection name={props.name}/>
            <div className='body'>
            </div>
            <div className='bottom'>
                <Navbar currentlySelected={props.currentlySelected} />
            </div>
        </>
    )
}

export default BlankDefaultPage
