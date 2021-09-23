import React, { useState } from 'react';
import "./InputText.css";

function InputSignUpText(props) {

    const [input, setInput] = useState(null);

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

function InputPasswordText(props) {

    const [input, setInput] = useState(null);
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(showPassword ? false : true);

    }

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
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange} />
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
        <div className="itext-db">
            <form onSubmit={handleSubmit}>
                <span className="itext-db-icon-left">{props.iconLeft}</span>
                <input className="itext-db-form"
                    placeholder={props.placeholder}
                    value={input}
                    onChange={handleInputChange} />
                <span className="itext-db-icon-right">{props.iconRight}</span>
            </form>
        </div>
    )
}

export {
    InputPasswordText,
    InputSignUpText,
    InputStandardText
}
