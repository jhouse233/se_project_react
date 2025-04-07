import { useTemperature } from '../../contexts/CurrentTemperatureUnitContext.jsx';
import { Link } from 'react-router-dom';
import { useContext } from 'react'

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.jsx'
import './Header.css';

import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png'





export default function Header({onOpenModal, location}) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        // weekday: 'long',
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const { currentTemperatureUnit, handleToggleSwitchChange } = useTemperature();



    return (
        <header className="header">
            <div className="header-left">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="header__logo" />
                </Link>
                <div className="date">{formattedDate}</div>
            </div>
            <div className="header-center">
                <p>{location}</p>
            </div>
            <div className="header-right">
                <ToggleSwitch />
                {/* <label className="header__toggle-switch">
                    <input 
                        type="checkbox" 
                        id="header-switch"
                        onChange={handleToggleSwitchChange}
                        checked={currentTemperatureUnit === "F"}
                    />
                    <span className="header__toggle" 
                        style={{
                            backgroundImage: 
                                `url(${currentTemperatureUnit === "F" ? toggleFahrenheit : toggleCelsius})`
                        }}
                        onMouseEnter={(e) => {
                            if (currentTemperatureUnit === 'F'){
                                e.target.style.backgroundImage = `url(${toggleFahrenheitHover})`;
                            }
                            
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundImage = `url(${currentTemperatureUnit === "F" ? toggleFahrenheit : toggleCelsius})`
                        }}
                    ></span>

                </label> */}
                {/* <button type="button" className="header__add-clothes-button" onClick={onOpenModal}>+ Add Clothes</button> */}
                <button type="button" className="header__add-clothes-button" onClick={() => {
                    console.log('Button clicked in Header');
                    onOpenModal()
                    }}>
                        + Add Clothes
                </button>
                <Link to="/profile" className="header__profile-link">
                    <p className="header__username">Terrance Tegegne</p>
                    <img src={avatar} alt="Avatar" className="header__avatar" />
                </Link>
            </div>
        </header>
    )
}