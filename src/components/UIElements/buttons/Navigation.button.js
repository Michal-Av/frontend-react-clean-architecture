// FavoritesButton.js
import React from 'react';
import { Link } from 'react-router-dom';


const NavigationButton = ({ buttonText, to }) => {
    return (
        <div className="col-auto">
            <Link className="button" to={to}>
                {buttonText}
            </Link>
        </div>
    );
};

export default NavigationButton;
