import React, { useState, } from 'react';
import "./InputText.css";


/**
 * The InputName component allows for a user to enter text into
 * an input tag. Alongside the text, a boolean is also passed up 
 * to the parent function utilising this compnent. If the inputted 
 * name contains prohibted characters the boolean value is set to 
 * false otherwise it is true 
 */
function InputName(props) {

    const handleName = (e) => {

        const thisName = e.target.value

        //characters not allowed within student's name
        // eslint-disable-next-line
        const reg = /[~`!0123456789@#$%\^&*+=\\[\]\\;,/{}|\\":<>\?]/g

        if (thisName.length >= 2 && !reg.test(String(thisName))) {
            props.onChange(thisName, true)
        } else {
            props.onChange(thisName, false)
        }

    }

    return (
        <div className="itext">

            <span className="itext-icon-left">{props.iconLeft}</span>
            <input className="itext-form"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleName} />
            <span className="itext-icon-right">{props.iconRight}</span>

        </div>
    )
}

/**
 * The InputName component allows for a user to enter a student number
 * into an input tag. Alongside the text, a boolean is also passed up 
 * to the parent function utilising this compnent. If the inputted 
 * name does not contain an 's' character followed by 7 integers 
 * the boolean value is set to false otherwise it is true 
 */
function InputStudentId(props) {

    const handleStudentId = (e) => {

        const thisStudentId = e.target.value
        // eslint-disable-next-line
        const reg = /s\b\d{6}\b/g
        if (thisStudentId.length === 8 && !reg.test(String(thisStudentId))) {
            props.onChange(thisStudentId, true)
        } else {
            props.onChange(thisStudentId, false)
        }
    }

    return (
        <div className="itext">

            <span className="itext-icon-left">{props.iconLeft}</span>
            <input className="itext-form"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleStudentId} />
            <span className="itext-icon-right">{props.iconRight}</span>

        </div>
    )
}


/**
 * The InputEmail component allows for a user to enter an email address
 * into an input tag. Alongside the text, a boolean is also passed up 
 * to the parent function utilising this compnent. If the inputted 
 * email does not satify the regex the boolean value is set to 
 * false otherwise it is true 
 */
function InputEmail(props) {

    const handleEmail = (e) => {
        const thisEmail = e.target.value;

        //checks for firstname.lastnamexx@uq.net.au
        // eslint-disable-next-line
        const reg = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@uq([\.])net([\.])au$/g

        if ((reg.test(String(thisEmail)))) {
            props.onChange(thisEmail, true);


        } else {
            props.onChange(thisEmail, false);

        }

    }

    return (
        <div className="itext">

            <span className="itext-icon-left">{props.iconLeft}</span>
            <input className="itext-form"
                type="email"
                name="email"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleEmail}
            />
            <span className="itext-icon-right" >{props.iconRight}</span>

        </div>
    )
}

/**
 * The InputPassword component allows for a user to enter a password
 * into an input tag. Alongside the text, a boolean is also passed up 
 * to the parent function utilising this compnent. If the inputted 
 * password is less than seven characters long the boolean value is set
 * to false otherwise it is true 
 */
function InputPassword(props) {

    const handlePassword = (e) => {
        const thisPassword = e.target.value;
        if (thisPassword.length >= 7) {
            props.onChange(thisPassword, true)
        } else {
            props.onChange(thisPassword, false)
        }
    }

    return (
        <div className="itext">
            <span className="itext-icon-left">{props.iconLeft}</span>
            <input className="itext-form"
                placeholder={props.placeholder}
                type="password"
                name="password"
                value={props.value}
                onChange={handlePassword}
            />
            <span className="itext-icon-right">{props.iconRight}</span>
        </div>
    )
}

/**
 * The InputStandardText component allows for a user to enter text
 * into an input tag. The text is passed up to the parent function 
 * using this component
 */
function InputStandardText(props) {

    const [input, setInput] = useState("");

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="itext-other">
            <form onSubmit={handleSubmit}>
                <span className="itext-other-icon-left">{props.iconLeft}</span>
                <input className="itext-other-form"
                    placeholder={props.placeholder}
                    value={input}
                    onChange={handleInputChange} />
                <span className="itext-other-icon-right">{props.iconRight}</span>
            </form>
        </div>
    )
}


/**
 * The InputCarRego component allows for a user to enter text
 * into an input tag. The text is passed up to the parent function 
 * using this component
 */
function InputCarRego(props) {

    const handleCarRego = (e) => {
        const thisDetail = e.target.value;
        props.onChange(thisDetail);

    }

    return (
        <div className="itext">

            <span className="itext-icon-left">{props.iconLeft}</span>
            <input className="itext-form-cars"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleCarRego} />
            <span className="itext-icon-right">{props.iconRight}</span>

        </div>
    )
}

/**
 * The InputCarDetails component allows for a user to enter text
 * into an input tag. The text is passed up to the parent function 
 * using this component
 */
function InputCarDetails(props) {

    const handleCarDetails = (e) => {
        const thisDetail = e.target.value;
        props.onChange(thisDetail);

    }

    return (
        <div className="itext">

            <span className="itext-icon-left" >{props.iconLeft}</span>
            <input className="itext-form-cars"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleCarDetails} />
            <span className="itext-icon-right">{props.iconRight}</span>

        </div>
    )
}

export {
    InputPassword,
    InputName,
    InputStudentId,
    InputEmail,
    InputStandardText,
    InputCarRego,
    InputCarDetails
}
