// Form.js
import React, { useState } from 'react';
import FormField from './FormField';
import './Form.css';
import { useTranslation } from 'react-i18next';

const Form = ({ onSubmit, message, fields, buttonText, actionText, onActionClick }) => {
    const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    const { t, i18n } = useTranslation();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    const formAlignmentClass = i18n.language === 'he' ? 'login-form-right' : 'login-form-left'; // Check language direction
  
    return (
      <div className={`login-form ${formAlignmentClass}`}> {/* Apply the appropriate alignment class */}
         <h3>{t(actionText)}</h3>
      <div>
        {actionText === t("Log in to your account") && <>{t("Don't have an account?")} <a href="#" onClick={onActionClick}>{t("Sign Up")}</a></>}
        {actionText === t("Create your account") && <>{t("Have an account?")} <a href="#" onClick={onActionClick}>{t("Log in now")}</a></>}
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
