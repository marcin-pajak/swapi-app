import React from 'react';
import ReactDOM from 'react-dom';
import Card from './index';
import {
  BrowserRouter as Router
} from 'react-router-dom';

const person = {url: "https://swapi.co/api/people/1/"};
const props = {
  person
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Card {...props} />
    </Router>,
    div
  );
});
