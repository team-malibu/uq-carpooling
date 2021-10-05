import React, { useState, useEffect } from 'react';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"
import "./InputText.css";

function InputName(props) {

    const [name, setName] = useState("");

    const handleName = (e) => {
        props.onChange(e.target.value)   
        
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

function InputEmail (props) {

    const [email, setEmail] = useState("");
    const [emailIcon, setEmailIcon] = useState(<BsExclamationCircle/>)
    const [validEmail, setValidEmail] = useState(false);

    const handleEmail = (e) => {
        const thisEmail = e.target.value;
        
        //checks for firstname.lastnamexx@uq.net.au
        const reg = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@uq([\.])net([\.])au$/g

        if((reg.test(String(thisEmail)))) {
             setValidEmail(true); 
             setEmailIcon(<BsCheckCircle/>)
             props.onChange(e.target.value)      
        } else {
             setValidEmail(false)
             setEmailIcon(<BsExclamationCircle/>)
             props.onChange(e.target.value)   
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
                <span className="itext-icon-right" >{emailIcon}</span>
           
        </div>
    )
}

function InputPassword(props) {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true);

    }

    const handlePassword = (e) => {
        const thisPassword = e.target.value;
        props.onChange(e.target.value)   
        setPassword(thisPassword)
    }


    return (
        <div className="itext">
            <form>
                <span className="itext-icon-left">{props.iconLeft}</span>
                <input className="itext-form"
                    placeholder={props.placeholder}
                    type="password"
                    name="password"
                    value={props.value}
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                    />
                
            </form>
        </div>
    )
}

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

export {
    InputPassword,
    InputName,
    InputEmail,
    InputStandardText
}
