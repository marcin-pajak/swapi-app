import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './planet';
import { mockResolve } from '../helpers/testsHelper';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ planets: {byId: {}, allIds: []} });

describe('planet', () => {

  describe('async actions', () => {
    it('should create fetching actions', () => {
      const response = `{
        "url": "url:planet1"
      }`;
      const normalizedData = {
        entities: {
          planets: {
            "url:planet1": {
              "url": "url:planet1"
            }
          }
        },
        result: "url:planet1"
      };
      global.fetch = mockResolve(response);

      const expectedActions = [
        { type: types.PLANET_FETCH_START, url: "url:planet1" },
        { type: types.PLANET_RECEIVE, data: normalizedData }
      ];

      return store.dispatch(actions.fetchPlanet("url:planet1")).then(() => {
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
      store.dispatch(actions.fetchPlanetIfNeeded("url:planet21"));
      expect(global.fetch).toHaveBeenCalledWith("url:planet21?format=json");
    });

    it('should not dispatch fetchPerson if no person in store', () => {
      const customStore = mockStore({ planets: {byId: {"url:person21": {url: "url:person21"}}, allIds: ["url:person21"]} });
      customStore.dispatch(actions.fetchPlanetIfNeeded("url:person21"));
      expect(global.fetch).not.toHaveBeenCalled();
    });

  });

});