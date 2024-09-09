import React from 'react';
import './TodaysForecast.css';
import wClearSky from '../../assets/wClearSky.svg';
import wCloudy from '../../assets/wCloudy.svg';
import wCloudyNight from '../../assets/wCloudyNight.svg';
import wDrizzle from '../../assets/wDrizzle.svg';
import wDrizzleNight from '../../assets/wDrizzleNight.svg';
import wFoggy from '../../assets/wFoggy.svg';
import wHeavyClouds from '../../assets/wHeavyClouds.svg';
import wPartlyCloudy from '../../assets/wPartlyCloudy.svg';
import wRaining from '../../assets/wRaining.svg';
import wRainWithSun from '../../assets/wRainWithSun.svg';
import wSunny from '../../assets/wSunny.svg';
import wThunderRaining from '../../assets/wThunderRaining.svg';
import wThunderstorm from '../../assets/wThunderstorm.svg';

function getWeatherImg (wCode) {
    switch(wCode) {
        case 1000: return wSunny;
        case 1003: return wPartlyCloudy;
        case 1006: return wCloudy;
        case 1009: return wHeavyClouds;
        case 1030: case 1114: case 1117: case 1135: case 1147: return wFoggy;
        case 1063: case 1066: case 1069: case 1072: return wRainWithSun;
        case 1087: return wThunderstorm;
        case 1153: case 1168: case 1171: case 1180: case 1183: case 1240: case 1261: return wDrizzle;
        case 1186: case 1189: case 1192: case 1195: case 1198: case 1201: case 1204: case 1207: case 1213: case 1216: case 1219: case
        1222: case 1225: case 1237: case 1243: case 1246: case 1249: case 1252: case 1255: case 1258: case 1264: return wRaining;
        case 1273: case 1276: case 1279: case 1282: return wCloudy;

        default: return wCloudy;
    }
}

function TodaysForecast( {todaysForecastData} ) {

    const DaysToForecast = 8;
    const hourlyForecast = todaysForecastData.forecast.forecastday[0].hour;
    const timeAtLocation = todaysForecastData.location.localtime;
    const hourAtLocation = Number((timeAtLocation.split(' ')[1]).split(':')[0]);

    let timeToForecast = [];
    for (let i = 1; i <= DaysToForecast; i++) {
        timeToForecast[i-1] = {key: i-1, hour:((hourAtLocation + i) % 24)};
    }

    return(
        <div className='forecast-container'>
            <p>Today's forecast</p>
            <div className='forecast'>

                {timeToForecast.map(forecast => (
                    <div key={forecast.key} className='hourly'>
                        <p className='time'>{(hourlyForecast[forecast.hour].time).split(' ')[1]}</p>
                        <img src={getWeatherImg(hourlyForecast[forecast.hour].condition.code)} />
                        <p className='temperature'>{Math.round(hourlyForecast[forecast.hour].temp_c)}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodaysForecast;