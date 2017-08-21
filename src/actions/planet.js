import { normalize } from 'normalizr';
import * as schema from './schema';
import * as types from '../constants/ActionTypes';
import * as selectors from '../reducers/index';

/**
 * Fetch planet if not in store
 * @param url
 */
export const fetchPlanetIfNeeded = (url) => (dispatch, getState) => {
  if (!selectors.getPlanetByUrl(getState(), url)) {
    return dispatch(fetchPlanet(url))
  }
  else {
    return Promise.resolve()
  }
};

/**
 * Fetch planet from API
 * @param url
 */
export const fetchPlanet = (url) => (dispatch) => {
  dispatch({
    type: types.PLANET_FETCH_START,
    url: url
  });

  return fetch(`${url}?format=json`)
    .then(response => response.json())
    .then(json => {
      dispatch({type: types.PLANET_RECEIVE, data: normalize(json, schema.planetSchema)})
    })
    .catch(error => dispatch({type: types.PLANET_FETCH_FAIL, error, url}));
};