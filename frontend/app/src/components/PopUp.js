import React from "react";
import "./PopUp.css";

function PopUp(props) {

    const handleClick = () => {
        props.toggle();
    };

    return (
        <div className="popUp">
            <div className="popUp-content">
                <p>{props.message}</p>
                <button className="popUp-button" onClick={handleClick}>Close</button>
            </div>
        </div>
    )
}

export default PopUp;