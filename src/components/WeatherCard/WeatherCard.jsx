import { React, useState, useEffect } from 'react'; 
import { useTemperature } from '../../contexts/CurrentTemperatureUnitContext.jsx';

import './WeatherCard.css'


import sunnyDay from '../../assets/sunny_day.svg'
import sunnyNight from '../../assets/sunny_night.svg'
import cloudyDay from '../../assets/cloudy_day.svg'
import cloudyNight from '../../assets/cloudy_night.svg'
import rainDay from '../../assets/rain_day.svg'
import rainNight from '../../assets/rain_night.svg'
import stormDay from '../../assets/storm_day.svg'
import stormNight from '../../assets/storm_night.svg'
import snowmDay from '../../assets/snow_day.svg'
import snowNight from '../../assets/snow_night.svg'
import fogDay from '../../assets/fog_day.svg'
import fogNight from '../../assets/fog_night.svg'

const weatherImages = {
    day: {
        Clear: sunnyDay,
        Clouds: cloudyDay,
        Rain: rainDay,
        Thunderstorm: stormDay,
        Snow: snowmDay,
        Fog: fogDay,
        Mist: fogDay,
        Drizzle: rainDay,
        Haze: fogDay,
        Smoke: fogDay
    },
    night: {
        Clear: sunnyNight,
        Clouds: cloudyNight,
        Rain: rainNight,
        Thunderstorm: stormNight,
        Snow: snowNight,
        Fog: fogNight,
        Mist: fogNight,
        Drizzle: rainNight,
        Haze: fogNight,
        Smoke: fogNight
    }
}
// export const convertToFahrenheit = (celsius) => {

//     return Math.round((celsius * 9/5) + 32);
// }


function WeatherCard({ day, type, weatherTemp }) {

    const currentHour = new Date().getHours();
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const { currentTemperatureUnit } = useTemperature();

    if (!weatherTemp || !type) {
        return (
            <div className="weather-card">
                <h2>Loading weather data</h2>
            </div>
        );
    }

    let imageToShow;
    try {
        if (currentHour >= 6 && currentHour < 18) {
            imageToShow = weatherImages.day[type];
        } else {
            imageToShow = weatherImages.night[type];
        }
    } catch(error) {
        return (
            <div className="weather-card">
                <h2>Error loading weather card</h2>
            </div>
        );
    }

    const handleCardClick = () => {
        setSelectedCard({
            name: 'Item Name',
            imageUrl: imageToShow,
            weatherType: type,
            temperature: weatherTemp?.[currentTemperatureUnit],
        });
        setModalOpen(true);
    };

    return (
        
            <div className="weather-card" onClick={handleCardClick}>
                <div className="weather-card_image-container" >
                    <img src={imageToShow} alt="weather" className="weather-card_image" />
                    <div className="weather-card_temp-overlay">{weatherTemp?.[currentTemperatureUnit]}°{currentTemperatureUnit}</div>
                </div>       
                <div className="weather-card_info-section">
                    <p className="weather-card_info">{day} is {weatherTemp?.[currentTemperatureUnit]}°{currentTemperatureUnit} / You may want to wear: </p>
                </div>
            </div>
        
    );
}
export default WeatherCard;
