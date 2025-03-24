import { useState } from 'react'; 
import './WeatherCard.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';


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
        Thunderstorms: stormDay,
        Snow: snowmDay,
        Fog: fogDay
    },
    night: {
        Clear: sunnyNight,
        Clouds: cloudyNight,
        Rain: rainNight,
        Thunderstorms: stormNight,
        Snow: snowNight,
        Fog: fogNight
    }
}

export const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9/5) + 32);
}


const WeatherCard = ({ day, type, weatherTemp }) => {
    // console.log('Temperature received:', weatherTemp, 'Type:', typeof weatherTemp);

    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const currentHour = new Date().getHours();

    let imageToShow;
    if (currentHour >= 6 && currentHour < 18) {
        imageToShow = weatherImages.day[type];
    } else {
        imageToShow = weatherImages.night[type];
    }

    if (weatherTemp === null) {
        return (
            <div className="weather-card">
                <h2>Loading weather data</h2>
            </div>
        );
    }

    const handleCardClick = () => {
        setSelectedCard({
            name: 'Item Name',
            imageUrl: imageToShow,
            weatherType: type,
            temperature: convertToFahrenheit(weatherTemp),
        });
        setModalOpen(true);
    };



    // console.log('Weather tye received:', type);
    // console.log('Image to Show:', imageToShow)
    return (
    <>
         <div className="weather-card" onClick={handleCardClick}>
            <div className="weather-card_image-section">
                <div className="weather-card_image-container" onClick={handleCardClick}>
                    <img src={imageToShow} alt="weather" className="weather-card_image" />
                    <div className="weather-card_temp-overlay">{convertToFahrenheit(weatherTemp)}°F</div>
                </div>
                
            </div>
            <div className="weather-card_info-section">
                <p className="weather-card_info">{day} is {convertToFahrenheit(weatherTemp)}°F / You may want to wear: </p>
                {/* <div className="weather-card_day">{day}</div>
                <div className="weather-card_type">{type}</div>
                <div className="weather-card_temp">{convertToFahrenheit(weatherTemp)}°F</div> */}
            </div>
        </div>
        

        
    </>
    )
}

export default WeatherCard;
