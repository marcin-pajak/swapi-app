import { combineReducers } from 'redux';
import createCachedSelector from 're-reselect';
import * as types from '../../constants/ActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.PLANET_RECEIVE:
      return {
        ...state,
        ...action.data.entities.planets
      };
    case types.PLANET_FETCH_FAIL:
      return {
        ...state,
        [action.url]: {
          residents: [],
          error: action.error,
          errorMessage: action.error.message || "Couldn't fetch planet"
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.PLANET_RECEIVE:
      if (state.indexOf(action.data.result) === -1) {
        return [...state, action.data.result];
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});

export const getPlanets = (state) => {
  return state.allIds.map(url => state.byId[url]);
};

export const getPlanetByUrl = (state, url) => {
  return state.byId[url];
};

export const getOtherResidents = (state, personUrl, planetUrl) => {
  const planet = getPlanetByUrl(state, planetUrl);
  return planet.residents.filter((resident) => resident !== personUrl);
};

export const getOtherResidentsCached = createCachedSelector(
  state => state,
  (state, personUrl) => personUrl,
  (state, personUrl, planetUrl) => planetUrl,
  (state, personUrl, planetUrl) => getOtherResidents(state, personUrl, planetUrl)
)(
  (state, personUrl, planetUrl) => personUrl
);