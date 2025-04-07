import React from 'react';
import { useTemperature } from '../../contexts/CurrentTemperatureUnitContext.jsx';

import toggleFahrenheit from '../../assets/toggle_state_farh.svg';
import toggleFahrenheitHover from '../../assets/toggle_state_farh_hover.svg';
import toggleTransition from '../../assets/toggle_state_transition.svg';
import toggleCelsius from '../../assets/toggle_state_celcious.svg';

import './ToggleSwitch.css';

function ToggleSwitch() {
    const { currentTemperatureUnit, handleToggleSwitchChange } = useTemperature();

    return (
        <label className="toggle-switch">
            <input 
                type="checkbox" 
                id="header-switch"
                onChange={handleToggleSwitchChange}
                checked={currentTemperatureUnit === "F"}
            />
            <span className="toggle__option" 
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
        </label>
    );
}

export default ToggleSwitch;