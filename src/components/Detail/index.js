import React from 'react';
import Spinner from '../Spinner/index';
import PersonCardContainer from '../../containers/PersonCard';
import './Detail.css';

const Detail = ({person, planet, otherResidents}) => {
  if (!person) {
    return <Spinner />;
  }

  return (
    <section className="Detail" itemScope itemType="http://schema.org/Person">
      <meta itemProp="height" content={person.height} />
      <h1 className="Detail-title">Name: <span itemProp="name">{person.name}</span></h1>

      <h3 className="Detail-subtitle">Details:</h3>
      <ul className="Detail-desc">
        <li>Born: <span className="u-color--primary">{person.birth_year}</span></li>
        <li>Gender: <span className="u-color--primary" itemProp="gender">{person.gender}</span></li>
        <li>Eye color: <span className="u-color--primary">{person.eye_color}</span></li>
        <li>Hair color: <span className="u-color--primary">{person.hair_color}</span></li>
        <li>Skin color: <span className="u-color--primary">{person.skin_color}</span></li>
        <li>Home planet: {planet ? <span className="u-color--primary" itemProp="birthPlace">{planet.name}</span> : "Loading..."}</li>
      </ul>

      <h3 className="Detail-subtitle">Other people from the same planet:</h3>
      { !planet && !otherResidents.length ? <Spinner /> : null }
      <div className="Detail-homies">
        <ul className="List Grid">
          {otherResidents.map(resident => (
            <li className="Grid-cell Cell-1of3" key={resident}><PersonCardContainer url={resident} /></li>
          ))}
        </ul>
      </div>
      { planet && !otherResidents.length ? <p>There are no other people from {planet.name} in Star Wars</p> : null}
    </section>
  );
};

export default Detail;

