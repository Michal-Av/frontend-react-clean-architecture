import React from 'react';
import './InputField.css';

const InputField = ({ type, name, placeholder, value, onChange }) => (
  <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
);

export default InputField;
