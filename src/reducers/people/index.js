import { combineReducers } from 'redux';
import * as types from '../../constants/ActionTypes';
import * as sortings from '../../constants/SortTypes';
import * as filters from '../../constants/FilterTypes';
import ui from './ui'
import * as fromUi from './ui';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.PEOPLE_RECEIVE:
    case types.PERSON_RECEIVE:
      return {
        ...state,
        ...action.data.entities.people
      };
    case types.PERSON_FETCH_FAIL:
      return {
        ...state,
        [action.url]: {
          error: action.error,
          errorMessage: action.error.message || "Couldn't fetch"
        }
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.PEOPLE_RECEIVE:
      const nextState = [...state];
      action.data.result.forEach(person => {
        if (nextState.indexOf(person) === -1) {
          nextState.push(person)
        }
      });
      return nextState;
    case types.PERSON_RECEIVE:
      if (state.indexOf(action.data.result) !== -1) {
        return state;
      }
      return [...state, action.data.result];
    default:
      return state;
  }
};

const people = combineReducers({
  byId,
  allIds,
  ui
});

export default people;

export * from './ui';

export const getPeople = (state) => {
  return state.allIds.map(url => state.byId[url]);
};

export const getVisiblePeople = (state) => {
  const people = getPeople(state);
  const sorting = fromUi.getCurrentSorting(state);
  const filter = fromUi.getCurrentFilter(state);
  const filtered = filterPeople(people, filter);
  return sortPeople(filtered, sorting)
};

export const getPersonByUrl = (state, url) => {
  return state.byId[url];
};

function _getYear (bbyYear, fallback) {
  return parseInt(bbyYear.replace('BBY', ''), 10) || fallback;
}

function sortPeople (state, sorting) {
  switch (sorting) {
    case sortings.NAME_ASC:
      return state.sort((a,b) => {
        return a.name !== b.name ? a.name < b.name ? -1 : 1 : 0
      });
    case sortings.AGE_ASC:
      return state.sort((a,b) => {
        let yearA = _getYear(a.birth_year, 9999);
        let yearB = _getYear(b.birth_year, 9999);
        return yearA - yearB;
      });
    case sortings.AGE_DESC:
      return state.sort((a,b) => {
        let yearA = _getYear(a.birth_year, 0);
        let yearB = _getYear(b.birth_year, 0);
        return yearB - yearA;
      });
    default:
      return state;
  }
}

function filterPeople (state, filter) {
  switch (filter) {
    case filters.FEMALE:
      return state.filter(person => {
        return person.gender === filters.FEMALE
      });
    case filters.MALE:
      return state.filter(person => {
        return person.gender === filters.MALE
      });
    case filters.NO_GENDER:
      return state.filter(person => {
        return person.gender === filters.NO_GENDER
      });
    default:
      return state;
  }
}