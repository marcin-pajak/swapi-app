import { combineReducers } from 'redux';
import people from './people';
import planets from './planets';
import * as fromPeople from './people';
import * as fromPlanets from './planets';

const app = combineReducers({
  people,
  planets
});

export const getPeople = (state) => {
  return fromPeople.getPeople(state.people);
};

export const getVisiblePeople = (state) => {
  return fromPeople.getVisiblePeople(state.people);
};

export const getPlanets = (state) => {
  return fromPlanets.getPlanets(state.planets);
};

export const getPersonByUrl = (state, url) => {
  return fromPeople.getPersonByUrl(state.people, url);
};

export const getPlanetByUrl = (state, url) => {
  return fromPeople.getPersonByUrl(state.planets, url);
};

export const getOtherResidents = (state, person) => {
  return fromPlanets.getOtherResidentsCached(state.planets, person.url, person.homeworld);
};

export const hasMorePeople = (state) => {
  return fromPeople.hasMorePeople(state.people);
};

export const getIsFetching = (state) => {
  return fromPeople.getIsFetching(state.people);
};

export const getIsPeopleDone = (state) => {
  return fromPeople.getIsDone(state.people);
};

export const getShouldInitFetchingPeople = (state) => {
  return fromPeople.getShouldInitFetching(state.people);
};

export const getNextPeoplePage = (state) => {
  return fromPeople.getNextPage(state.people);
};

export const getCurrentSorting = (state) => {
  return fromPeople.getCurrentSorting(state.people);
};

export const getCurrentFilter = (state) => {
  return fromPeople.getCurrentFilter(state.people);
};

export default app;