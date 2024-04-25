// WeatherBackground.js
import React from 'react';
import '../../styles/background.css'

const WeatherBackground = ({ backgroundImage }) => {
    return (
        <div
            className="background-wrapper"
            style={{
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        />
    );
};

export default WeatherBackground;
