import React, { useState } from 'react';
import { CgGenderFemale, CgGenderMale } from 'react-icons/cg';
import { IoMdTransgender } from 'react-icons/io';
import { BsFillCaretDownFill, BsPeopleFill, BsPersonFill } from 'react-icons/bs';
import { WiTime2, WiTime3, WiTime4 } from 'react-icons/wi';
import { TiSpanner } from 'react-icons/ti';
import { MdBusinessCenter } from 'react-icons/md';
import { RiMentalHealthFill } from 'react-icons/ri';
import { FaClinicMedical, FaFlask } from 'react-icons/fa';
import { AiFillRead } from 'react-icons/ai';
import { motion } from "framer-motion"
import './DropDownMenu.css';

/**
 * The GenderDropDownMenu component is displayed on the AccountDetails page
 * and allows a user to select their gender. When the component is set to open
 * a list of options to select from are displayed. Selecting a new value updates
 * the gender  icon  hook.
 *
 */

function GenderDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [genderIcon, setGenderIcon] = useState(props.genderValue === "Male" ? <CgGenderMale /> : props.genderValue === "Female" ? <CgGenderFemale /> : <IoMdTransgender />)

    /**
    * Passes value back up to parent function updating 
    * the state in AccountDetails
    */
    function handleGender(thisGender) {
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
                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGenderIcon(<CgGenderMale />); handleGender('Male') }}>
                        <span className="icon-button">{<CgGenderMale />}</span>
                        Male
                    </motion.li>

                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGenderIcon(<CgGenderFemale />); handleGender('Female') }}>
                        <span className="icon-button">{<CgGenderFemale />}</span>
                        Female
                    </motion.li>

                    <motion.li className="dd-option" value={props.value} onClick={() => { setIsOpen(!isOpen); setGenderIcon(<IoMdTransgender />); handleGender('Gender Diverse') }}>
                        <span className="icon-button">{<IoMdTransgender />}</span>
                        Gender Diverse
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

/**
 * The DriverDropDownMenu component is displayed on the AccountDetails page
 * and allows a user to select their driver preference. When the component is set
 * to open a list of options to select from are displayed. Selecting a new value updates
 * the gender  icon  hook.
 *
 */
function DriverDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [driverIcon, setDriverIcon] = useState(props.driverPrefValue === 'Any Driver' ? <BsPeopleFill /> : <BsPersonFill />);

    /**
    * Passes value back up to parent function updating 
    * the state in AccountDetails
    */
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
                    <motion.li className="dd-option" onClick={() => { handleDriverPref("Any Driver"); setIsOpen(!isOpen); setDriverIcon(<BsPeopleFill />) }}>
                        <span className="icon-button">{<BsPeopleFill />}</span>
                        Any driver
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setDriverIcon(<BsPersonFill />); handleDriverPref('My Gender') }}>
                        <span className="icon-button">{<BsPersonFill />}</span>
                        My gender only
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

/**
 * The TimingDropDownMenu component is displayed on the AccountDetails page
 * and allows a user to select their arrival time. When the component is set to open
 * a list of options are displayed. Selecting a new value updates the icon  hook.
 */
function TimingDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [timeIcon, setTimeIcon] = useState(props.arrivalTimeValue === "30 mins" ? <WiTime2 /> : props.arrivalTimeValue === "1 hour" ? <WiTime3 /> : <WiTime4 />)

    /**
    * Passes value back up to parent function updating 
    * the state in AccountDetails
    */
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
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setTimeIcon(<WiTime2 />); handleArrivalTime("30 mins") }}>
                        <span className="icon-button">{<WiTime2 />}</span>
                        30 mins
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setTimeIcon(<WiTime3 />); handleArrivalTime("1 hour") }}>
                        <span className="icon-button">{<WiTime3 />}</span>
                        1 hour
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setTimeIcon(<WiTime4 />); handleArrivalTime("2 hours") }}>
                        <span className="icon-button">{<WiTime4 />}</span>
                        2 hours
                    </motion.li>
                </div>
            </motion.div>
        )
    }
}

/**
 * The ScholDropDownMenu component is displayed on the AccountDetails page
 * and allows a user to select their school. When the component is set to open
 * a list of options are displayed. Selecting a new value updates the icon hook.
 */
function SchoolDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [schoolIcon, setSchoolIcon] = useState(props.schoolValue === "EAIT" ? <TiSpanner /> : props.schoolValue === "Medicine" ? <FaClinicMedical />
        : props.schoolValue === "Science" ? <FaFlask /> : props.schoolValue === "Business/Law/Economics" ? <MdBusinessCenter /> : props.schoolValue === "Humanities/Social Sciences" ? <AiFillRead /> : <RiMentalHealthFill />);

    /**
    * Passes value back up to parent function updating 
    * the state in AccountDetails
    */
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
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<MdBusinessCenter />); handleSchool("Business/Law/Economics") }}>
                        <span className="icon-button">{<MdBusinessCenter />}</span>
                        Business/Law/Economics
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<TiSpanner />); handleSchool("EAIT") }}>
                        <span className="icon-button">{<TiSpanner />}</span>
                        EAIT
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<RiMentalHealthFill />); handleSchool('Health/Behavourial Sciences') }}>
                        <span className="icon-button">{<RiMentalHealthFill />}</span>
                        Health/Behavourial Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<AiFillRead />); handleSchool("Humanities/Social Sciences") }}>
                        <span className="icon-button">{<AiFillRead />}</span>
                        Humanities/Social Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<FaClinicMedical />); handleSchool('Medicine') }}>
                        <span className="icon-button">{<FaClinicMedical />}</span>
                        Medicine
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchoolIcon(<FaFlask />); handleSchool("Science") }}>
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

