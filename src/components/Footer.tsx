import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 text-center text-gray-500 text-sm relative z-10 glass-nav">
            <p>&copy; {new Date().getFullYear()} Abdur Rahman. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
