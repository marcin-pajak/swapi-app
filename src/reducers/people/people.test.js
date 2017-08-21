import reducer from './index'
import * as types from '../../constants/ActionTypes';
import * as sortings from '../../constants/SortTypes';
import * as filters from '../../constants/FilterTypes';
import * as selectors from './index';

const uiInit = {
  isFetching: false,
  next: null,
  done: false,
  error: null,
  filter: null,
  sorting: null
};

const defaultState = {
  byId: {},
  allIds: [],
  ui: uiInit
};

const mockPersonState = {
  byId: {
    "url:person1": {url: "url:person1"}
  },
  allIds: ["url:person1"],
  ui: uiInit
};

const mockPeopleState = {
  byId: {
    "url:person1": {url: "url:person1"},
    "url:person2": {url: "url:person2"}
  },
  allIds: ["url:person1", "url:person2"],
  ui: Object.assign({}, uiInit, {
    isFetching: false,
    next: "url:people2",
    done: false
  })
};

describe('people reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      ui: uiInit
    })
  });

  it('should handle PERSON_RECEIVE', () => {
    expect(
      reducer(undefined, {
        type: types.PERSON_RECEIVE,
        data: {
          entities: {
            people: {
              "url:person1": {
                url: "url:person1"
              }
            }
          },
          result: "url:person1"
        }
      })
    ).toEqual(mockPersonState)
  });

  it('should handle PEOPLE_RECEIVE', () => {
    expect(
      reducer(undefined, {
        type: types.PEOPLE_RECEIVE,
        data: {
          entities: {
            people: {
              "url:person1": {
                url: "url:person1"
              },
              "url:person2": {
                url: "url:person2"
              }
            }
          },
          result: ["url:person1", "url:person2"]
        },
        next: "url:people2"
      })
    ).toEqual(mockPeopleState)
  });

  it('should handle PEOPLE_FETCH_START', () => {
    const expectedState = Object.assign({}, defaultState, {
      ui: Object.assign({}, uiInit, {
        isFetching: true
      })
    });
    expect(
      reducer(undefined, {
        type: types.PEOPLE_FETCH_START
      })
    ).toEqual(expectedState)
  });

  it('should handle PEOPLE_FETCH_FAIL', () => {
    const expectedState = Object.assign({}, defaultState, {
      ui: Object.assign({}, uiInit, {
        isFetching: false,
        error: "Error"
      })
    });
    expect(
      reducer(undefined, {
        type: types.PEOPLE_FETCH_FAIL,
        error: "Error"
      })
    ).toEqual(expectedState)
  });

  it('should handle SET_SORTING', () => {
    const expectedState = Object.assign({}, defaultState, {
      ui: Object.assign({}, uiInit, {
        sorting: sortings.NAME_ASC
      })
    });
    expect(
      reducer(undefined, {
        type: types.SET_SORTING,
        payload: sortings.NAME_ASC
      })
    ).toEqual(expectedState)
  });

  it('should handle SET_FILTER', () => {
    const expectedState = Object.assign({}, defaultState, {
      ui: Object.assign({}, uiInit, {
        filter: filters.FEMALE
      })
    });
    expect(
      reducer(undefined, {
        type: types.SET_FILTER,
        payload: filters.FEMALE
      })
    ).toEqual(expectedState)
  });

});

const people = [
  {url: "url:person1", name: "A", birth_year: "800BBY", gender: 'female'},
  {url: "url:person2", name: "B", birth_year: "80BBY", gender: 'female'},
  {url: "url:person3", name: "D", birth_year: "8BBY", gender: 'male'},
  {url: "url:person4", name: "C", birth_year: "18BBY", gender: 'male'}
];
const mockState = {
  byId: {
    "url:person1": people[0],
    "url:person2": people[1],
    "url:person3": people[2],
    "url:person4": people[3]
  },
  allIds: ["url:person1", "url:person2", "url:person3", "url:person4"],
  ui: {
    done: false,
    isFetching: false,
    next: "url:people2",
    filter: filters.FEMALE,
    sorting: sortings.AGE_ASC
  }
};

describe('people selectors', () => {
  it('should return all people', () => {
    expect(selectors.getPeople(mockState)).toEqual(people);
  });

  it('should return if is fetching people', () => {
    expect(selectors.getIsFetching(mockState)).toEqual(false)
  });

  it('should return if there is more people to fetch', () => {
    expect(selectors.hasMorePeople(mockState)).toBeTruthy()
  });

  it('should return females orederd by age', () => {
    expect(selectors.getVisiblePeople(mockState)).toEqual([
      {url: "url:person2", name: "B", birth_year: "80BBY", gender: 'female'},
      {url: "url:person1", name: "A", birth_year: "800BBY", gender: 'female'}
    ])
  });

  it('should return males ordered by age', () => {
    const customState = Object.assign({}, mockState, {
      ui: {
        filter: filters.MALE,
        sorting: sortings.AGE_DESC
      }
    });
    expect(selectors.getVisiblePeople(customState)).toEqual([
      {url: "url:person4", name: "C", birth_year: "18BBY", gender: 'male'},
      {url: "url:person3", name: "D", birth_year: "8BBY", gender: 'male'}
    ])
  });

  it('should return all people', () => {
    const customState = Object.assign({}, mockState, {
      ui: {
        filter: filters.NONE,
        sorting: sortings.NONE
      }
    });
    expect(selectors.getVisiblePeople(customState)).toEqual(people)
  });
});