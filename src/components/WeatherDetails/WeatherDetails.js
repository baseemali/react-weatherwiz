import React from 'react';
import './WeatherDetails.css';
import { FiSun, FiCompass, FiSunrise, FiSunset, FiThermometer, FiWind,
         FiDroplet, FiUmbrella, FiEye } from 'react-icons/fi';
import { BiTachometer } from 'react-icons/bi';

const weatherDetailsConfig = [
    { icon: <FiSun />, label: 'UV Index', key: 'uv' },
    { icon: <FiThermometer />, label: 'Feels Like', key: 'feelslike_c', suffix: '°' },
    { icon: <FiWind />, label: 'Wind', key: 'wind_kph', suffix: ' KM/H' },
    { icon: <FiCompass />, label: 'Wind Direction', key: 'wind_dir' },
    { icon: <FiDroplet />, label: 'Humidity', key: 'humidity', suffix: '%' },
    { icon: <FiUmbrella />, label: 'Precipitation', key: 'precip_mm', suffix: ' MM' },
    { icon: <FiEye />, label: 'Visibility', key: 'vis_km', suffix: ' KM' },
    { icon: <BiTachometer />, label: 'Pressure', key: 'pressure_mb', suffix: ' hPa' }
];

function WeatherDetails({ fetchWeatherDetails }) {
    return (
        <div className='wdetails-container'>
            <p>Weather Conditions</p>
            <div className='weather-info'>
                {weatherDetailsConfig.map(({ icon, label, key, suffix = '' }) => (
                    <div className='detail-card' key={key}>
                        <p>{icon} {label}</p>
                        <p>{fetchWeatherDetails[key]}{suffix}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherDetails;