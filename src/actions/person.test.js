import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './person';
import { mockResolve } from '../helpers/testsHelper';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ people: {ui: {}, byId: {}, allIds: []}, planets: {byId: {}, allIds: []} });

describe('person', () => {

  describe('async actions', () => {
    it('should create fetching actions', () => {
      const response = `{
        "homeworld": "url:planet1",
        "url": "url:person1"
      }`;
      const normalizedData = {
        entities: {
          people: {
            "url:person1": {
              "homeworld": "url:planet1",
              "url": "url:person1"
            }
          }
        },
        result: "url:person1"
      };
      global.fetch = mockResolve(response);

      const expectedActions = [
        { type: types.PERSON_FETCH_START, url: "url:person1" },
        { type: types.PERSON_RECEIVE, data: normalizedData },
        { type: types.PLANET_FETCH_START, url: "url:planet1" }
      ];

      return store.dispatch(actions.fetchPerson("url:person1")).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

  });

  describe('action fetchPersonIfNeeded', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
      global.fetch.mockClear();
    });

    it('should dispatch fetchPerson if no person in store', () => {
      store.dispatch(actions.fetchPersonIfNeeded("url:person21"));
      expect(global.fetch).toHaveBeenCalledWith("url:person21?format=json");
    });

    it('should not dispatch fetchPerson if no person in store', () => {
      const customStore = mockStore({ people: {ui: {}, byId: {"url:person21": {url: "url:person21", homeworld: "url:planet1"}}, allIds: []}, planets: {byId: {}, allIds: []} });
      customStore.dispatch(actions.fetchPersonIfNeeded("url:person21"));
      expect(global.fetch).toHaveBeenCalledWith("url:planet1?format=json");
    });

  });

});