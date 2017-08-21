import { normalize } from 'normalizr';
import * as schema from './schema';
import * as types from '../constants/ActionTypes';
import * as selectors from '../reducers';
import { fetchPlanetIfNeeded } from './planet';

/**
 * Fetch person if not in store
 * @param url
 */
export const fetchPersonIfNeeded = (url) => (dispatch, getState) => {
  const person = selectors.getPersonByUrl(getState(), url);

  if (person) {
    return dispatch(fetchPlanetIfNeeded(person.homeworld))
  }
  else {
    return dispatch(fetchPerson(url));
  }
};

/**
 * Fetch person from API
 * @param url
 */
export const fetchPerson = (url) => (dispatch) => {
  dispatch({
    type: types.PERSON_FETCH_START,
    url: url
  });

  return fetch(`${url}?format=json`)
    .then(response => response.json())
    .then(json => {
      dispatch({type: types.PERSON_RECEIVE, data: normalize(json, schema.personSchema)});
      dispatch(fetchPlanetIfNeeded(json.homeworld));
    })
    .catch(error => dispatch({type: types.PERSON_FETCH_FAIL, error, url}));
};