import React, { useState, useEffect, useRef } from 'react';
import { CgGenderFemale, CgGenderMale } from 'react-icons/cg';
import { IoMdTransgender } from 'react-icons/io';
import { BsFillCaretDownFill, BsPeopleFill, BsPersonFill } from 'react-icons/bs';
import { TiSpanner } from 'react-icons/ti';
import { MdBusinessCenter } from 'react-icons/md';
import { RiMentalHealthFill } from 'react-icons/ri';
import { FaClinicMedical, FaFlask } from 'react-icons/fa';
import { AiFillRead } from 'react-icons/ai';
import { motion } from "framer-motion"
import './DropDownMenu.css';

function GenderDropDownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [gender, setGender] = useState('Male');
    const [genderIcon, setGenderIcon] = useState(<CgGenderMale />)

    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.75 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {genderIcon} </span>
                    {gender}
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
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setGender('Male'); setGenderIcon(<CgGenderMale />) }}>
                        <span className="icon-button">{<CgGenderMale />}</span>
                        Male
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setGender('Female'); setGenderIcon(<CgGenderFemale />) }}>
                        <span className="icon-button">{<CgGenderFemale />}</span>
                        Female
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setGender('Gender Diverse'); setGenderIcon(<IoMdTransgender />) }}>
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


    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {driverIcon} </span>
                    {driverPref}
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
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setDriverPref("Any Driver"); setDriverIcon(<BsPeopleFill />) }}>
                        <span className="icon-button">{<BsPeopleFill />}</span>
                        Any driver
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setDriverPref('My Gender'); setDriverIcon(<BsPersonFill />) }}>
                        <span className="icon-button">{<BsPersonFill />}</span>
                        My gender only
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

    if (!isOpen) {
        return (
            <motion.div className="dropdown"
                onClick={() => setIsOpen(true)}
                animate={{ height: "3.5rem" }}
                transition={{ ease: "easeOut", duration: 0.5 }}>
                <div className="dd-main"
                >
                    <span className="icon-button"> {schoolIcon} </span>
                    {school}
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
                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool("Business/Law/Economics"); setSchoolIcon(<MdBusinessCenter />) }}>
                        <span className="icon-button">{<MdBusinessCenter />}</span>
                        Business/Law/Economics
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('EAIT'); setSchoolIcon(<TiSpanner />) }}>
                        <span className="icon-button">{<TiSpanner />}</span>
                        EAIT
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Health/Behavourial Sciences'); setSchoolIcon(<RiMentalHealthFill />) }}>
                        <span className="icon-button">{<RiMentalHealthFill />}</span>
                        Health/Behavourial Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Humanities/Social Sciences'); setSchoolIcon(<AiFillRead />) }}>
                        <span className="icon-button">{<AiFillRead />}</span>
                        Humanities/Social Sciences
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Medicine'); setSchoolIcon(<FaClinicMedical />) }}>
                        <span className="icon-button">{<FaClinicMedical />}</span>
                        Medicine
                    </motion.li>

                    <motion.li className="dd-option" onClick={() => { setIsOpen(!isOpen); setSchool('Science'); setSchoolIcon(<FaFlask />) }}>
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
    SchoolDropDownMenu
}

