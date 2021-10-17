import React, { useState, useEffect } from 'react';
import {BsExclamationCircle, BsCheckCircle} from "react-icons/bs"
import "./InputText.css";

function InputName(props) {

    const handleName = (e) => {

        const thisName = e.target.value

        //characters not allowed within student's name
        const reg = /[~`!0123456789@#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g

        if(thisName.length >= 2 && !reg.test(String(thisName))) {
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

function InputStudentId(props) {
    
    const handleStudentId = (e) => {

        const thisStudentId = e.target.value

        const reg = /s\b\d{6}\b/g

        if (thisStudentId.length == 8 && !reg.test(String(thisStudentId))) {
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

function InputEmail(props) {

    const handleEmail = (e) => {
        const thisEmail = e.target.value;

        //checks for firstname.lastnamexx@uq.net.au
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

function InputPassword(props) {

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true);

    }

    const handlePassword = (e) => {
        const thisPassword = e.target.value;
        if(thisPassword.length >= 7) {
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
                    type={showPassword ? "text" : "password"}
                    />
                 <span className="itext-icon-right">{props.iconRight}</span>
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
    InputStudentId,
    InputEmail,
    InputStandardText
}
