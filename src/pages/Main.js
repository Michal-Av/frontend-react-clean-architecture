import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FavoritesComp from './Favorites';
import WeatherComp from './Weather';
import '../App.css'

function MainComp() {

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={WeatherComp} />
          <Route path="/favorites" component={FavoritesComp} />
        </Switch>
      </div>
    </Router>

  );
}

export default MainComp;