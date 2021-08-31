import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const Header1 = ({ page }) => {
    const [showArrow, setShowArroe] = useState(true);
    const [showTitle, setShowTitle] = useState(true);
    setTimeout(() => {
        setShowTitle(false);
    }, 4000);

    return (
        <>
        </>
    )
}

const Navbar = ({ selected }) => {
    const someting = 0;
}

const Header = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    return (
        <AnimatePresence>
            <motion.h1
                key={1}
                initial={{ x: '100vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ s: '-100vw', opacity: 0 }}>
                Default
            </motion.h1>

        </AnimatePresence>
    )
}
function DefaultPage() {
    const [showArrow, setShowArrow] = useState(true);
    const [showTitle, setShowTitle] = useState(true);
    setTimeout(() => {
        setShowTitle(false);
    }, 4000);

    return (
        <motion.div>
            <AnimatePresence>
                {showTitle && (
                    <motion.h2
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3 }}
                    > Thank you for your order :)</motion.h2 >
                )}
            </AnimatePresence>
            <Header name='Default' />
        </motion.div>
    )
}



export default DefaultPage
