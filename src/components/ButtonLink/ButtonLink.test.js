import React from 'react';
import ReactDOM from 'react-dom';
import ButtonLink from './index';

const isActive = true;
const onClick = () => {};
const type = 'TYPE';
const children = "Test";
const props = {isActive, onClick, type, children};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonLink {...props} />, div);
});
