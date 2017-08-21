import * as types from '../../constants/ActionTypes';

const uiInit = {
  isFetching: false,
  next: null,
  done: false,
  error: null,
  filter: null,
  sorting: null
};

const ui = (state = uiInit, action) => {
  switch (action.type) {
    case types.PEOPLE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        next: action.next,
        done: !action.next
      };
    case types.PEOPLE_FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case types.PEOPLE_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error || "Couln't fetch people"
      };
    case types.SET_SORTING:
      return {
        ...state,
        sorting: action.payload
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default ui;

export const hasMorePeople = (state) => {
  return state.ui.next || !state.ui.done;
};

export const getIsFetching = (state) => {
  return state.ui.isFetching;
};

export const getIsDone = (state) => {
  return state.ui.done;
};

export const getShouldInitFetching = (state) => {
  return (!state.ui.next && !state.ui.done && !state.ui.isFetching);
};

export const getNextPage = (state) => {
  return state.ui.next;
};

export const getCurrentSorting = (state) => {
  return state.ui.sorting;
};

export const getCurrentFilter = (state) => {
  return state.ui.filter;
};

export const getPeopleError = (state) => {
  return state.ui.error;
};