import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from '../../pages/Home';
import PersonPage from '../../pages/Person';

const App = () => (
  <Router>
    <div className="App">
      <Route scrollStrategy exact path="/" component={HomePage}/>
      <Route scrollStrategy exact path="/:person" component={PersonPage}/>
    </div>
  </Router>
);

export default App;
