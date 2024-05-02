// Home.js
import React from 'react';
import Header from '../components/Layout/Navigation/Header';
import Todos from '../components/Layout/Todos'

const Home = () => {
  // Assuming you have some way to get the username of the logged-in user
  return (
    <div>
      <Header />
      {/* Add the rest of your Home component content here */}
      <Todos></Todos>
    </div>
  );
};

export default Home;
