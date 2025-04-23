const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const APIkey = '05b0cdc03d6234bbf372577c627a39d8';
import { _request } from './api';

export const getWeatherData = async (cityName) => {
    try {
        const url = `${baseURL}?q=${cityName}&units=metric&appid=${APIkey}`;
        const data = await _request(url);
        console.log('Weather data received:', data);
        return data;
    } catch(error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};






// export const getWeatherData = async (cityName) => {
//     try{
//         const res = await fetch(`${baseURL}?q=${cityName}&units=metric&appid=${APIkey}`);
//         if (!res.ok) {
//             throw new Error(`Weather API request failed: ${res.status}`);
//         }
//         const data = await res.json();
//         console.log('Weather data received:', data)
//         return data;
//     } catch(error) {
//         console.error('Error fetching weather data:', error);
//         return null;
//     }

// }

