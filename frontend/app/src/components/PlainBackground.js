import React from 'react'


function PlainBackground() {

    let style = {
        setWidth: {width: "100%"},
        setHeight: {height: "100%"}
        
    };

    return (
        <div className='Background' style={style.setWidth, style.setHeight}>
                <svg class="Backgorund_bn">
                    <linearGradient id="Backgorund_bn" spreadMethod="pad" x1="1.309" x2="-0.034" y1="-0.434" y2="1.038">
                        <stop offset="0" stop-color="#8000ff" stop-opacity="1"></stop>
                        <stop offset="0.6054" stop-color="#37a7f2" stop-opacity="1"></stop>
                        <stop offset="1" stop-color="#4ce2e2" stop-opacity="1"></stop>
                    </linearGradient>
                    <rect id="Backgorund_bn" rx="0" ry="0" x="0" y="0" width="100%" height="100%">
                    </rect>
                </svg>
                <svg class="Rectangle_314">
                    <rect id="Rectangle_314" rx="0" ry="0" x="0" y="0" width="100%" height="100%">
                    </rect>
                </svg>
        </div>
    );
}

export default PlainBackground