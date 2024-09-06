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
  const [geoLocation, setGeoLocation] = useState([]);
  const [geoError, setGeoError] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;
  const base_url = 'https://api.weatherapi.com/v1/forecast.json?key=';
  //const url = base_url + API_KEY + '&q=' + cityName;
  
  // Function to update state
  const handleCityNameChange = (newCityName) => {
    setCityName(newCityName);
  };

  useEffect(() => {
    
    const fetchData = async (searchValue) => {
      setFetchError('');
      setLoading(true);
      const url = base_url + API_KEY + '&q=' + searchValue;
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

    const fetchLocation = async () => {
      setLoading(true);

      try {
        const response = await axios.get('https://ipapi.co/json/');
        setGeoLocation(response.data);
        console.log(response);
        setLoading(false);
      }
      catch (err) {
        setGeoError(err.message);
        console.log(geoError);
      }
    };

  
    if(cityName) {
      fetchData(cityName);
    } else if (loading) {
      fetchLocation();
      if(geoError != '')
        fetchData(geoLocation.city);
    }

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
