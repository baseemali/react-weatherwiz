import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import TodaysForecast from './components/TodaysForecast/TodaysForecast';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import ErrorComponent from './components/Error/Error';

function App() {

  // State declaration
  const [cityName, setCityName] = useState('');
  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const API_KEY = '1e847a456d2b4f73940103417242808';
  const base_url = 'http://api.weatherapi.com/v1/forecast.json?key=';
  const url = base_url + API_KEY + '&q=' + cityName;
  
  // Function to update state
  const handleCityNameChange = (newCityName) => {
    setCityName(newCityName);
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetchError('');
      setLoading(true);
      try {
        const response = await axios.get(url);
        setCityWeatherData(response.data);
        setLoading(false);
      }
      catch (err) {
        if (err.response) {
          setFetchError(err.response.data.error);
        } else if (err.request) {
          setFetchError('Error: No response received from the server');
        } else {
          setFetchError(`Error: ${err.message}`);
        }
        setLoading(false);
      }
    };
  
    if(cityName)
      fetchData();

  }, [cityName]);
  

  if (loading) {
    return (
      <div className='App'>
        <Navbar onCityNameChange={handleCityNameChange} />
      </div>
    );
  } else if (!loading && fetchError != '') {
    return (
      <div className='App'>
        <Navbar onCityNameChange={handleCityNameChange} />
        <ErrorComponent errorMessage={fetchError.message}/>
      </div>
    );
  }

  return (
    <div className='App'>
      <Navbar onCityNameChange={handleCityNameChange} />
      <WeatherInfo cityWeatherInfo={cityWeatherData} />
      <TodaysForecast todaysForecastData={cityWeatherData} />
      <WeatherDetails fetchWeatherDetails={cityWeatherData.current}/>
    </div>
  );
}

export default App;
