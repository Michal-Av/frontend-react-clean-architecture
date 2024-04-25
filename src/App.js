import React, { Component } from 'react';
import MainComp from './pages/Main'
import './App.css'
import Test from './tests/Test';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <MainComp />
      </div>
    )
  }
}


export default App;