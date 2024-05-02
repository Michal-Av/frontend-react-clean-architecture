// Form.js
import React, { useState } from 'react';
import FormField from './FormField';
import './Form.css';

const Form = ({ onSubmit, message, fields, buttonText, actionText, onActionClick }) => {
  const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="login-form">
      <h3>{actionText}</h3>
      <div>
        {actionText === "Log in to your account" && <>Don't have an account? <a href="#" onClick={onActionClick}>Sign Up</a></>}
        {actionText === "Create your account" && <>Have an account? <a href="#" onClick={onActionClick}>Log in now</a></>}
      </div>
      <br></br>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
            <div key={field.name}>
          <FormField  label={field.label} type={field.type} name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={e => setFormData({ ...formData, [field.name]: e.target.value })} />
          <br /></div>
        )) }<br></br> 
        <div className="message">{message}</div>
        <br></br>
        <div>
          <input className='button' type="submit" value={buttonText} />
        </div>
      </form>
    </div>
  );
};

export default Form;
