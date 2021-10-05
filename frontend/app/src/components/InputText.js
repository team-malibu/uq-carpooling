import React, { useState, useEffect } from 'react';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"
import "./InputText.css";

function InputSignUpText(props) {

    const [input, setInput] = useState("");

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="itext">
            <form onSubmit={handleSubmit}>
                <span className="itext-icon-left">{props.iconLeft}</span>
                <input className="itext-form"
                    placeholder={props.placeholder}
                    value={input}
                    onChange={handleInputChange} />
                <span className="itext-icon-right">{props.iconRight}</span>
            </form>
        </div>
    )
}

function InputEmail(props) {

    const [email, setEmail] = useState("");
    const [emailIcon, setEmailIcon] = useState(<BsExclamationCircle/>)
    const [validEmail, setValidEmail] = useState(false);

    const manageEmail = (e) => {
        const thisEmail = e.target.value;
        setEmail(thisEmail)

        //checks for firstname.lastnamexx@uq.net.au
        const reg = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@uq([\.])net([\.])au$/g

        if((reg.test(String(thisEmail)))) {
             setValidEmail(true); 
             setEmailIcon(<BsCheckCircle/>)      
        } else {
             setValidEmail(false)
             setEmailIcon(<BsExclamationCircle/>)  
        }
    }

    return (
        <div className="itext">
            <form >
                <span className="itext-icon-left">{props.iconLeft}</span>
                <input className="itext-form"
                    type="email"
                    name="email"
                    placeholder={props.placeholder}
                    value={email}
                    onChange={manageEmail}
                   />
                <span className="itext-icon-right" >{emailIcon}</span>
            </form>
        </div>
    )
}

function InputPassword(props) {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true);

    }

    const managePassword = (e) => {
        const thisPassword = e.target.value;
        setPassword(thisPassword)
    }

    // function handleSubmit(e) {
    //     e.preventDefault()
    // }

    return (
        <div className="itext">
            <form 
            // onSubmit={handleSubmit}
            >
                <span className="itext-icon-left">{props.iconLeft}</span>
                <input className="itext-form"
                    placeholder={props.placeholder}
                    type="password"
                    name="password"
                    value={password}
                    onChange={managePassword}
                    type={showPassword ? "text" : "password"}
                    />
                <span className="itext-icon-right" onClick={togglePassword}></span>
            </form>
        </div>
    )
}

function InputStandardText(props) {

    const [input, setInput] = useState(null);

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

export {
    InputPassword,
    InputSignUpText,
    InputEmail,
    InputStandardText
}
