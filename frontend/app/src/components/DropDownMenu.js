import React, { useState } from 'react';
import { CgGenderFemale, CgGenderMale } from 'react-icons/cg';
import { IoMdTransgender } from 'react-icons/io';
import { BsFillCaretDownFill, BsPeopleFill, BsPersonFill } from 'react-icons/bs';
import {WiTime2, WiTime3, WiTime4 } from 'react-icons/wi';
import { TiSpanner } from 'react-icons/ti';
import { MdBusinessCenter } from 'react-icons/md';
import { RiMentalHealthFill } from 'react-icons/ri';
import { FaClinicMedical, FaFlask } from 'react-icons/fa';
import { AiFillRead } from 'react-icons/ai';
import { motion } from "framer-motion"
import './DropDownMenu.css';

function GenderDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [gender, setGender] = useState("Male");
    const [genderIcon, setGenderIcon] = useState(<CgGenderMale />)

    function handleGender(thisGender) {
        setGender(thisGender);
        props.handleChange(thisGender);
      }

   
    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.75 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {genderIcon} </span>
                    {props.genderValue}
                    <span className="icon-right"> {<BsFillCaretDownFill />} </span>
                </div>
            </motion.div>
        )

    } else {
        return (
            <motion.div className="dropdown"
                animate={{ height: "14.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }} >
                <motion.div className="dd-main-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.75 }}>
                    Choose a gender

                </motion.div>

                <div className="dd-list">
                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGender('Male'); setGenderIcon(<CgGenderMale />); handleGender('Male') }}>
                        <span className="icon-button">{<CgGenderMale />}</span>
                        Male
                    </motion.li>

                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGender('Female'); setGenderIcon(<CgGenderFemale />); handleGender('Female') }}>
                        <span className="icon-button">{<CgGenderFemale />}</span>
                        Female
                    </motion.li>

                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGender('Gender Diverse'); setGenderIcon(<IoMdTransgender />); handleGender('Gender Diverse') }}>
                        <span className="icon-button">{<IoMdTransgender />}</span>
                        Gender Diverse
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

function DriverDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [driverPref, setDriverPref] = useState("Any Driver");
    const [driverIcon, setDriverIcon] = useState(<BsPeopleFill />);

    function handleDriverPref(thisDriverPref) {
        props.handleChange(thisDriverPref);
      }


    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {driverIcon} </span>
                    {props.driverPrefValue}
                    <span className="icon-right"> {<BsFillCaretDownFill />} </span>
                </div>
            </motion.div>
        )

    } else {
        return (
            <motion.div className="dropdown"
                animate={{ height: "11rem" }}
                transition={{ ease: "easeOut", duration: 0.75 }} >
                <motion.div className="dd-main-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.75 }}>
                    Driver Preference
                </motion.div>

                <div className="dd-list">
                    <motion.li className="dd-option" onClick={() => { setDriverPref("Any Driver"); handleDriverPref("Any Driver"); setIsOpen(!isOpen);  setDriverIcon(<BsPeopleFill />) }}>
                        <span className="icon-button">{<BsPeopleFill />}</span>
                        Any driver
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setDriverPref('My Gender'); setDriverIcon(<BsPersonFill />); handleDriverPref('My Gender') }}>
                        <span className="icon-button">{<BsPersonFill />}</span>
                        My gender only
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

function TimingDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [arrivalTime, setArrivalTime] = useState("30 minutes before class");
    const [timeIcon, setTimeIcon] = useState(<WiTime2 />)

    function handleArrivalTime(thisArrivalTime) {
        props.handleChange(thisArrivalTime)
    }

   
    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.75 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {timeIcon} </span>
                    {props.arrivalTimeValue}
                    <span className="icon-right"> {<BsFillCaretDownFill />} </span>
                </div>
            </motion.div>
        )

    } else {
        return (
            <motion.div className="dropdown"
                animate={{ height: "14.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }} >
                <motion.div className="dd-main-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.75 }}>
                    Choose a time

                </motion.div>

                <div className="dd-list">
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setArrivalTime("30 minutes before class"); setTimeIcon(<WiTime2 />); handleArrivalTime("30 mins") }}>
                        <span className="icon-button">{<WiTime2 />}</span>
                        30 minutes before class
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setArrivalTime("1 hour before class"); setTimeIcon(<WiTime3 />); handleArrivalTime("1 hour") }}>
                        <span className="icon-button">{<WiTime3 />}</span>
                        1 hour before class
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setArrivalTime("2 hours before class"); setTimeIcon(<WiTime4 />); handleArrivalTime("2 hours") }}>
                        <span className="icon-button">{<WiTime4 />}</span>
                        2 hours before class
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

function SchoolDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [school, setSchool] = useState("EAIT");
    const [schoolIcon, setSchoolIcon] = useState(<TiSpanner />);

    function handleSchool(thisSchool) {
        props.handleChange(thisSchool);
      }

    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {schoolIcon} </span>
                    {props.schoolValue}
                    <span className="icon-right"> {<BsFillCaretDownFill />} </span>
                </div>
            </motion.div>
        )

    } else {
        return (
            <motion.div className="dropdown"
                animate={{ height: "25.5rem" }}
                transition={{ ease: "easeOut", duration: 0.75 }} >
                <motion.div className="dd-main-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.75 }}>
                    Select your school
                </motion.div>

                <div className="dd-list">
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool("Business/Law/Economics"); setSchoolIcon(<MdBusinessCenter />); handleSchool("Business/Law/Economics") }}>
                        <span className="icon-button">{<MdBusinessCenter />}</span>
                        Business/Law/Economics
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('EAIT'); setSchoolIcon(<TiSpanner />); handleSchool("EAIT") }}>
                        <span className="icon-button">{<TiSpanner />}</span>
                        EAIT
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Health/Behavourial Sciences'); setSchoolIcon(<RiMentalHealthFill />); handleSchool('Health/Behavourial Sciences') }}>
                        <span className="icon-button">{<RiMentalHealthFill />}</span>
                        Health/Behavourial Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Humanities/Social Sciences'); setSchoolIcon(<AiFillRead />); handleSchool("Humanities/Social Sciences") }}>
                        <span className="icon-button">{<AiFillRead />}</span>
                        Humanities/Social Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Medicine'); setSchoolIcon(<FaClinicMedical />); handleSchool('Medicine') }}>
                        <span className="icon-button">{<FaClinicMedical />}</span>
                        Medicine
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Science'); setSchoolIcon(<FaFlask />); handleSchool("Science") }}>
                        <span className="icon-button">{<FaFlask />}</span>
                        Science
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

export {
    DriverDropDownMenu,
    GenderDropDownMenu,
    SchoolDropDownMenu,
    TimingDropDownMenu
}

