import React from 'react';
import logo from '../images/logo.png';
import '../styles/Header.css';

const Header: React.FC = () => {
    return (
        <>
            <header className="d-flex align-items-center justify-content-center my-2">
                <img
                    src={logo}
                    alt="Logo"
                    className="logo"
                />
                <h1 className="ms-2 text-light">Memory Game</h1>
            </header>
            <p className="lead">Match all the pairs!</p>
        </>
    );
};

export default Header;