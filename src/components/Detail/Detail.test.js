import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './index';

const person = {url: "url:person1"};
const planet = {url: "url:planer1"};
const otherResidents = [];

const props = {
  person,
  planet,
  otherResidents
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Detail {...props} />, div);
});
