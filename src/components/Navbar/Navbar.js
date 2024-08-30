import React, { useState, useEffect } from 'react'
import './Navbar.css';
import logo from '../../assets/Logo.png'

function Navbar({ onCityNameChange }) {
    //City variable
    const [cityName, setCityName] = useState('');

    //Function to update city
    const handleCityNameChange = (event) => {
        setCityName(event.target.value);
    }

    const handleSubmit = () => {
        onCityNameChange(cityName);
    }

    return(
        <nav className='navbar'>
            <div className='navbar-title'>
                <h1>WeatherWiz</h1>
                <img src={logo} />
            </div>
            <div className='navbar-search'>
                <input type='text' value={cityName} onChange={handleCityNameChange} placeholder='Search for cities'></input>
                <button onClick={handleSubmit}>
                    <i className='glyphicon glyphicon-search'></i>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;