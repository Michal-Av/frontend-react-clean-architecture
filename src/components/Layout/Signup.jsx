import { useState, useEffect } from 'react';
import React from 'react';
import SignupForm from '../components/Containers/Form/SignupForm'
import {signup} from '../services/api';
import '../styles/Login.css';

function SignupComp(props) {

  const [message, setMessage] = useState("");

  const handleSubmit  = async (email, username, password) => {
    try {
      await signup(email, username, password);
      setMessage('User Created!')
      props.history.push("/");
    } catch (error) {
      setMessage('User not created')
    }
  };

  return (
    <div style={{ height: "514px"}}>
    <div className="main-page">
      <h3>Please Enter Your Details:</h3>
      <SignupForm onSubmit={handleSubmit} message={message} />
    </div>
    </div>
  );
}

export default SignupComp;