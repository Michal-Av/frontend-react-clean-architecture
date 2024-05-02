import React from 'react';
import InputField from '../../UIElements/Input/InputField';
import './FormField.css';

const FormField = ({ label, type, name, placeholder, value, onChange }) => (
    <div>
      {label} <InputField type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
  
export default FormField;