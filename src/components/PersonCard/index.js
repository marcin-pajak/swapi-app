import React from 'react';
import { NavLink } from 'react-router-dom';
import { urlToRoute } from '../../helpers/pathHelper';
import './PersonCard.css';

const Card = ({person}) => {
  if (!person) {
    return <div className="Card"><p>Loading...</p></div>
  }
  return (
    <NavLink to={urlToRoute(person.url)} className="Card">
      <h3 className="Card-title">{person.name}</h3>
      <ul className="Card-details Details-desc List">
        <li className="Details-descItem">Born: {person.birth_year}</li>
        <li className="Details-descItem">Gender: {person.gender}</li>
      </ul>
      <span className="Card-link">See details</span>
    </NavLink>
  )
};

export default Card;