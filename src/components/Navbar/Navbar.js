import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Navbar.css';
import logo from '../../assets/Logo.png'

function Navbar({ onCityNameChange }) {

    //City variable
    const [cityName, setCityName] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [error, setError] = useState('');

    const base_url  = "https://api.weatherapi.com/v1/search.json?key=";
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        setCityList([]);
        setError('');
        const api_url = base_url + API_KEY + '&q=' + userInput;

        const fetchCities = async () => {
            try {
                const response = await axios.get(api_url);
                setCityList(response.data);
                if(cityName === '') {
                    setIsVisible(true);
                }
            } catch (err) {
                setError(err.message);
                console.log(error);
                setIsVisible(false);
            }
        };

        if(userInput.length >= 3)
            fetchCities();
        else {
            setIsVisible(false);
        }

    }, [userInput]);

    //Function to update city
    const handleCityNameChange = (event) => {
        setUserInput(event.target.value);
        if (event.target.value >= 3 && cityName === '') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const clearCityName = () => {
        setCityName('');
        setIsVisible(false);
    }

    const handleCitySelect = (event) => {
        setUserInput(event.target.innerHTML);
        setCityName(event.target.innerHTML);
        setIsVisible(false);
    }

    const handleSubmit = () => {
        onCityNameChange(cityName);
    }

    return(
        <nav className='navbar'>
            <div className='navbar-title'>
                <img src={logo} alt='WeatherWiz App Icon' />
                <h2>WeatherWiz</h2>
            </div>
            <div className='navbar-search'>
                <div className='input-col'>
                    <input name='search-bar' type='text' value={userInput} onFocus={clearCityName} onChange={handleCityNameChange} placeholder='Search for cities'></input>
                    <div style={{display: isVisible ? 'block' : 'none'}} className='suggestion-box'>
                        <ul>
                            {
                                cityList.map(location => (
                                    <li key={location.id} onClick={handleCitySelect}>{location.name + ', ' + location.country}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className='btn-col'>
                    <button htmlFor='search-bar' onClick={handleSubmit}>
                        <i className='glyphicon glyphicon-search'></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;