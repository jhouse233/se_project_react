import { useState, useEffect } from 'react'

import { useTemperature } from '../../contexts/CurrentTemperatureUnitContext.jsx';

import WeatherCard from '../WeatherCard/WeatherCard.jsx'
import './Main.css';
import ItemCard from '../ItemCard/ItemCard.jsx'

export default function Main({ weatherData, cards, onCardClick, onCardLike, isLoggedIn }) {
    // console.log('Main component Rendering')
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



    const getWeatherType = (temperature) => {
        const tempInFahrenheight = temperature.F;
        if (tempInFahrenheight >= 75) {
            return 'hot';
        } else if (tempInFahrenheight >= 60) {
            return 'warm';
        } else {
            return 'cold';
        }
    }

    const [currentWeatherType, setCurrentWeatherType] = useState(weatherData?.temperature ? getWeatherType(weatherData.temperature) : 'hot');

    const handleEditClick = (card) => {
        setSelectedCard(card);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        if (weatherData?.temperature) {
            setCurrentWeatherType(getWeatherType(weatherData.temperature))
        }
    }, [weatherData]);

    useEffect(() => {
        console.log('Main component mounted');
    }, []);

    const { currentTemperatureUnit } = useTemperature();
    // console.log('Temperature data:', weatherData?.temperature);
    
    return (
        
            <main className="main">
                <div className="main__content">
                    <div className="weather-container">
                        {weatherData && (
                            <WeatherCard 
                                day="Today"
                                type={weatherData?.weather?.[0]?.main}
                                weatherTemp={weatherData?.temperature} 
                            />
                        )}
                    </div>

                    <ul className="cards__grid">
                        {cards
                        .filter((card) => {
                            return card.weather === currentWeatherType
                        })
                        .map((card) => {
                            return (
                                <ItemCard 
                                    key={card._id}
                                    item={card}
                                    onCardClick={onCardClick}
                                    onEditClick={handleEditClick}
                                    onCardLike={onCardLike}
                                    isLoggedIn={isLoggedIn}
                                />
                            )
                        })
                        }
                    </ul>
                </div>
            </main>
        
    )
}