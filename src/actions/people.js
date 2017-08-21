import { normalize } from 'normalizr';
import * as schema from './schema';
import * as types from '../constants/ActionTypes';
import * as selectors from '../reducers';

/**
 * Set current sorting of people
 * @param payload
 * @returns {{type, payload: *}}
 */
export const setSorting = (payload) => {
  return {
    type: types.SET_SORTING,
    payload
  }
};

/**
 * Set current filter for people
 * @param payload
 * @returns {{type, payload: *}}
 */
export const setFilter = (payload) => {
  return {
    type: types.SET_FILTER,
    payload
  }
};

/**
 * Fetch one page of people, if available
 */
export const fetchPeople = () => (dispatch, getState) => {
  const state = getState();
  const url = selectors.getNextPeoplePage(state) || "https://swapi.co/api/people/?format=json";

  if (selectors.getIsPeopleDone(state)) {
    return Promise.resolve()
  }

  dispatch({
    type: types.PEOPLE_FETCH_START
  });

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch({type: types.PEOPLE_RECEIVE, data: normalize(json.results, schema.peopleSchema), next: json.next})
    })
    .catch(error => dispatch({type: types.PEOPLE_FETCH_FAIL, error}));
};

/**
 * Fetch people if not initialized earlier
 */
export const fetchPeopleIfNeeded = () => (dispatch, getState) => {
  if (selectors.getShouldInitFetchingPeople(getState())) {
    return dispatch(fetchPeople());
  }
  else {
    return Promise.resolve()
  }
};