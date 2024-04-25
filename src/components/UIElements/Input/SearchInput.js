// SearchInput.js
import React from 'react';

const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="col-md-12 input"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;