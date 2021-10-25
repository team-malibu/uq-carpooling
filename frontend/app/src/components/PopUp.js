import React from "react";
import "./PopUp.css";

/**
 * The PopUp component is used to display important information
 * to the user i.e. they have entered fields incorrectly or
 * to display help messages.
 *
 */
function PopUp(props) {
    const message = props.message;
    const display = message.split('\n').map(str => <p>{str}</p>);

    const handleClick = () => {
        props.toggle();
    };

    return (
        <div className="popUp">
            <div className="popUp-content">
                {display}
            </div>
            <div className="popUp-footer">
                <button className="popUp-button" onClick={handleClick}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;