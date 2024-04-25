// SuggestionItem.js
import React from 'react';

const SuggestionItem = ({ suggestion, onSuggestHandler }) => {
    return (
        <div
            className="suggestion col-md-12 justify-content-md-center"
            onClick={() => onSuggestHandler(suggestion.name)}
        >
            {suggestion.name}
        </div>
    );
};

export default SuggestionItem;
