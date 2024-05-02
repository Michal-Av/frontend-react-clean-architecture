import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../components/Containers/Form/Form';
import { login, signup } from '../services/api-auth';
import { useTranslation  } from "react-i18next";
import '../styles/Login.css';
import LanguageSelector from "../components/UIElements/Select/LanguageSelector";
import Logo from '../assets/images/logo/3.png';

function LoginComp({ setLoggedIn }) {
  const [signupMode, setSignupMode] = useState(false);
  const [message, setMessage] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState('');
  const { t,i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  
  // Define translated login and signup fields
  const loginFields = [
    { label: t("User Name :"), type: "text", name: "username", placeholder: t("Enter your username") },
    { label: t("Password :"), type: "password", name: "password", placeholder: t("Enter your password") }
  ];

  const signupFields = [
    { label: t("Email :"), type: "email", name: "email", placeholder: t("Enter your email") },
    { label: t("User Name :"), type: "text", name: "username", placeholder: t("Enter your username") },
    { label: t("Password :"), type: "password", name: "password", placeholder: t("Enter your password") }
  ];


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('loggedIn') === 'true') {
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store authentication state in session storage as backup
    }
  }, [location.search, setLoggedIn]);

  const handleLogin = async (formData) => {
    try {
      await login(formData.username, formData.password);
      console.log("Logged in successfully");
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store authentication state in session storage
      history.push("/home");
    } catch (error) {
      setMessage('User Name or password incorrect');
    }
  };

  const handleSignup = async (formData) => {
    try {
      await signup(formData.email, formData.username, formData.password);
      setMessage('User Created!');
      setSignupMode(!signupMode);
    } catch (error) {
      setMessage('User not created');
    }
  };

   // Determine the form alignment based on language direction
   const formAlignmentClass = i18n.language === 'he' ? 'login-form-right' : 'login-form-left';


  return (
    <div className='sidebar'>
       <div className="logo-lang-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <LanguageSelector onLanguageChange={setCurrentLanguage} />
      </div>
      <div className={`main-page ${formAlignmentClass}`}> {/* Apply the appropriate alignment class */}
      <Form
          onSubmit={signupMode ? handleSignup : handleLogin}
          message={message}
          fields={signupMode ? signupFields : loginFields}
          buttonText={signupMode ? t("signup") : t("login")}
          actionText={signupMode ? t("Create your account") : t("Log in to your account")}
          onActionClick={() => setSignupMode(!signupMode)}
        />
      </div>
    </div>
  );
}

export default LoginComp;
