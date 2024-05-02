import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../components/Containers/Form/Form';
import { login, signup } from '../services/api-auth';
import '../styles/Login.css';
import Logo from '../assets/images/logo/3.png';

const loginFields = [
  { label: "User Name :", type: "text", name: "username", placeholder: "Enter your username" },
  { label: "Password :", type: "password", name: "password", placeholder: "Enter your password" }
];

const signupFields = [
  { label: "Email :", type: "email", name: "email", placeholder: "Enter your email" },
  { label: "User Name :", type: "text", name: "username", placeholder: "Enter your username" },
  { label: "Password :", type: "password", name: "password", placeholder: "Enter your password" }
];

function LoginComp({ setLoggedIn }) {
  const [signupMode, setSignupMode] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const location = useLocation();

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

  return (
    <div className='sidebar'>
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="main-page">
        <Form
          onSubmit={signupMode ? handleSignup : handleLogin}
          message={message}
          fields={signupMode ? signupFields : loginFields}
          buttonText={signupMode ? "Sign Up" : "Login"}
          actionText={signupMode ? "Create your account" : "Log in to your account"}
          onActionClick={() => setSignupMode(!signupMode)}
        />
      </div>
    </div>
  );
}

export default LoginComp;
