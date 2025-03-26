import { useState, useEffect } from 'react'
import { convertToFahrenheit} from '../WeatherCard/WeatherCard.jsx';

import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import './Main.css';
import ItemCard from '../ItemCard/ItemCard.jsx'


export default function Main({weatherData, cards, onCardClick}) {
    // console.log('Weather Data in Main:', weatherData);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



    const getWeatherType = (temperature) => {
        const tempInFahrenheight = convertToFahrenheit(temperature);
        if (tempInFahrenheight >= 75) {
            return 'hot';
        } else if (tempInFahrenheight >= 60) {
            return 'warm';
        } else {
            return 'cold';
        }
    }

    const [currentWeatherType, setCurrentWeatherType] = useState(weatherData?.main?.temp ? getWeatherType(weatherData.main.temp) : 'hot');

    const handleEditClick = (card) => {
        setSelectedCard(card);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        if (weatherData?.main?.temp) {
            setCurrentWeatherType(getWeatherType(weatherData.main.temp))
        }
    }, [weatherData]);

    // console.log('Entire weatherData:', weatherData);
    // console.log('Weather type from API:', weatherData?.weather?.[0]?.main);

    return (
        
            <main className="main">
                <div className="main__content">
                    {/* <WeatherCard weatherData={weatherData} /> */}
                    <div className="weather-container">
                        {weatherData && (
                            <WeatherCard 
                                day="Today"
                                type={weatherData?.weather?.[0]?.main}
                                weatherTemp={weatherData?.main?.temp} 
                            />
                        )}
                    </div>

                    <ul className="cards__grid">
                        {cards
                        .filter((card) => {
                            // console.log('Card weather type:', JSON.stringify(card.weatherType))
                            // console.log('Current Weather type:', JSON.stringify(currentWeatherType))
                            // console.log('Are they equal?:', card.weatherType === currentWeatherType)

                            return card.weatherType === currentWeatherType
                        })
                        .map((card) => {
                            return (
                                <ItemCard 
                                    key={card._id}
                                    item={card}
                                    onCardClick={onCardClick}
                                    onEditClick={handleEditClick}
                                />
                            )
                        })
                        }
                    </ul>
                </div>
            </main>
        
    )
}