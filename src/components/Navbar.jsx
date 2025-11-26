import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none"
        >
            <div className="text-2xl font-bold tracking-tighter pointer-events-auto cursor-pointer">LBB</div>
            <button className="text-sm font-medium hover:text-lime transition-colors pointer-events-auto cursor-pointer">
                LOGIN
            </button>
        </motion.nav>
    );
};

export default Navbar;
