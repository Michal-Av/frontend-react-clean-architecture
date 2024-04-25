// LangChanger.js
import React from 'react';

const LangChanger = ({ onLanguageChange }) => {
    return (
        <div className="col-auto">
            <button onClick={onLanguageChange}>Change Language</button>
        </div>
    );
};

export default LangChanger;