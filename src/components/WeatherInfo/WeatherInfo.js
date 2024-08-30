import React from 'react';
import './WeatherInfo.css';

import {
    wClearSky, wCloudy, wCloudyNight, wDrizzle, wDrizzleNight, wFoggy,
    wHeavyClouds, wPartlyCloudy, wRaining, wRainWithSun, wSunny, wThunderRaining,
    wThunderstorm
} from '../../assets'; // Import all images from an index file or similar

const weatherImages = {
    1000: wSunny,
    1003: wPartlyCloudy,
    1006: wCloudy,
    1009: wHeavyClouds,
    1030: wFoggy, 1114: wFoggy, 1117: wFoggy, 1135: wFoggy, 1147: wFoggy,
    1063: wRainWithSun, 1066: wRainWithSun, 1069: wRainWithSun, 1072: wRainWithSun,
    1087: wThunderstorm,
    1153: wDrizzle, 1168: wDrizzle, 1171: wDrizzle, 1180: wDrizzle, 1183: wDrizzle,
    1240: wDrizzle, 1261: wDrizzle,
    1186: wRaining, 1189: wRaining, 1192: wRaining, 1195: wRaining, 1198: wRaining,
    1201: wRaining, 1204: wRaining, 1207: wRaining, 1213: wRaining, 1216: wRaining,
    1219: wRaining, 1222: wRaining, 1225: wRaining, 1237: wRaining, 1243: wRaining,
    1246: wRaining, 1249: wRaining, 1252: wRaining, 1255: wRaining, 1258: wRaining,
    1264: wRaining,
    1273: wCloudy, 1276: wCloudy, 1279: wCloudy, 1282: wCloudy
};

const getWeatherImg = (wCode) => weatherImages[wCode] || wCloudy;

const WeatherInfo = ({ cityWeatherInfo }) => {
    const { location, current, forecast } = cityWeatherInfo;
    const localHour = Number(location.localtime.split(' ')[1].split(':')[0]);
    const chanceOfRain = forecast.forecastday[0].hour[localHour].chance_of_rain;

    return (
        <div className='weather-container'>
            <div className='weather-details'>
                <p className='city'>{location.name}</p>
                <p className='chance-rain'>Chance of rain: {chanceOfRain}%</p>
                <p className='temperature'>{Math.round(current.temp_c)}°</p>
            </div>
            <div className='weather-icon'>
                <img src={getWeatherImg(current.condition.code)} alt="Weather icon" />
            </div>
        </div>
    );
}

export default WeatherInfo;