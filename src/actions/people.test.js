import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as filters from '../constants/FilterTypes';
import * as sortings from '../constants/SortTypes';
import * as actions from './people';
import { mockResolve } from '../helpers/testsHelper';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ people: {ui: {isFetching: false}, byId: {}, allIds: []} });


describe('people ', () => {

  describe('sync actions', () => {

    it('should create an action to set sorting option', () => {
      const payload = sortings.NAME_ASC;
      const expectedAction = {
        type: types.SET_SORTING,
        payload
      };
      expect(actions.setSorting(payload)).toEqual(expectedAction)
    });

    it('should create an action to set filter', () => {
      const payload = filters.FEMALE;
      const expectedAction = {
        type: types.SET_FILTER,
        payload
      };
      expect(actions.setFilter(payload)).toEqual(expectedAction)
    });

  });

  describe('async actions', () => {
    it('should create fetching actions', () => {
      const response = `{
        "count": 1,
        "next": "url:peoplePage2",
        "results": [
          {
            "url": "url:person1"
          },
          {
            "url": "url:person2"
          }
        ]
      }`;
      const normalizedData = {
        entities: {
          people: {
            "url:person1": {
              "url": "url:person1"
            },
            "url:person2": {
              "url": "url:person2"
            }
          }
        },
        result: ["url:person1", "url:person2"]
      };
      global.fetch = mockResolve(response);

      const expectedActions = [
        { type: types.PEOPLE_FETCH_START },
        { type: types.PEOPLE_RECEIVE, data: normalizedData, next: "url:peoplePage2" }
      ];

      return store.dispatch(actions.fetchPeople()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

  });

  describe('action fetchPeopleIfNeeded', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
      global.fetch.mockClear();
    });

    it('should dispatch fetchPeople if not fetched yet', () => {
      store.dispatch(actions.fetchPeopleIfNeeded());
      expect(global.fetch).toHaveBeenCalledWith("https://swapi.co/api/people/?format=json");
    });

    it('should not dispatch fetchPeople', () => {
      const storeFetching = mockStore({ people: {ui: {isFetching: true}, byId: {}, allIds: []} });
      storeFetching.dispatch(actions.fetchPeopleIfNeeded());
      expect(global.fetch).not.toHaveBeenCalled();
    });

  });


});