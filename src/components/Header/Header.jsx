import { useTemperature } from '../../contexts/CurrentTemperatureUnitContext.jsx';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../contexts/CurrentUserContext.jsx';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx'
import './Header.css';

import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png'





export default function Header({onOpenModal, location, handleAddClick, handleLoginClick, handleRegisterClick}) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        // weekday: 'long',
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const { currentTemperatureUnit, handleToggleSwitchChange } = useTemperature();
    const { currentUser } = useContext(UserContext);
    const userInitial = currentUser?.name || 'User';

    return (
        <header className="header">
            <div className="header__logo-container">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="header__logo" />
                </Link>
                <p className="header__date-place">{formattedDate} {location}</p>
                {/* <ToggleSwitch /> */}
            </div>
            <ToggleSwitch />

            <button 
                type="button" 
                className={`header__add-clothes-button ${!currentUser ? "header__add-clothes-button_hidden" : ""}`}
                onClick={handleAddClick}
            >
                + Add Clothes
            </button>
            {currentUser !== null ? (
                <Link to="/profile" className="header__profile-link">
                    <p className="header__user">{userInitial}</p>
                    <img src={currentUser?.avatar} alt="Avatar" className="header__avatar" />
                </Link>

                
                ) : (
                    <div className="header__buttons-container">
                        {/* <ToggleSwitch /> */}

                        <button 
                            className="header__signup-button"
                            type='button'
                            onClick={handleRegisterClick} 
                        >
                            Sign Up
                        </button>
                        <button 
                            className="header__login-button"
                            type='button'
                            onClick={handleLoginClick} 
                        >
                            Login
                        </button>
                    </div>
                )}
        </header>
    )
}