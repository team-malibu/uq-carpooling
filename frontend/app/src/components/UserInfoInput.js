import React from 'react';
import styled from 'styled-components';
import { MdLockOutline } from 'react-icons/md';

const Lock = styled(MdLockOutline)`
color:DeepSkyBlue;
transform: scale(1.5);
position: relative;
left: 40px;
`

const FieldStyling = styled.input`
background-color: #ddedfd;
width:75%;
height:35px;
border-radius: 20px;
font-family: 'Lato', sans-serif;
border:none;
outline:none;
font-size: 20px;
margin-top:25px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 50px;
font-family: 'Lato', sans-serif;
color:DeepSkyBlue;
::placeholder,
::-webkit-input-placeholder {
    font-family: 'Lato', sans-serif;
    color:DeepSkyBlue;
    text-align:left;
    font-size:20px;
}
`

const UserInfoInput = styled(({
    type,
    className,
    id,
    value,
    onChange,
    placeholder

}) => {
    return (
        <div className={className}>
            <Lock />
            <FieldStyling
                type={type}
                className={className}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />



        </div>
    )
})``


export {
    UserInfoInput,
};