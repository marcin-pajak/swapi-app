import { schema } from 'normalizr';

const planet = new schema.Entity('planets', {}, {
  idAttribute: 'url'
});

const person = new schema.Entity('people', {
  homeworld: planet
}, { idAttribute: 'url' });

const people = [ person ];

planet.define({
  residents: [ person ]
});

export const planetSchema = planet;
export const personSchema = person;
export const peopleSchema = people;