import React from 'react';
import './Error.css';
import { FiXCircle } from 'react-icons/fi';

function Error( {errorMessage} ) {
    return(
        <div className='error-container'>
            <p className='error-message'><FiXCircle className='error-icon' /> ERROR: {errorMessage}</p>
        </div>
    );
}

export default Error;