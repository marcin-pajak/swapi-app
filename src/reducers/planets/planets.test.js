import reducer from './index'
import * as selectors from './index';
import * as types from '../../constants/ActionTypes';

const mockState = {
  byId: {
    "url:planet1": {url: "url:planet1"}
  },
  allIds: ["url:planet1"]
};

const planet = {
  url: "url:planet21",
  residents: [
    "url:person1",
    "url:person2",
    "url:person3"
  ]
};

describe('planets reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      allIds: []
    })
  });

  it('should handle PLANET_RECEIVE', () => {
    expect(
      reducer(undefined, {
        type: types.PLANET_RECEIVE,
        data: {
          entities: {
            planets: {
              "url:planet1": {
                url: "url:planet1"
              }
            }
          },
          result: "url:planet1"
        }
      })
    ).toEqual(mockState)
  });

});

describe('planets selectors', () => {

  it('should return all planets', () => {
    expect(selectors.getPlanets(mockState)).toEqual([
      {url: "url:planet1"}
    ])
  });

  it('should return planet by url', () => {
    expect(selectors.getPlanetByUrl(mockState, "url:planet1")).toEqual(
      {url: "url:planet1"}
    )
  });

  it('should return other residents from a planet', () => {
    const state = {
      byId: {"url:planet21": planet},
      allIds: ["url:planet21"]
    };
    const residents = selectors.getOtherResidents(state, "url:person1", "url:planet21");

    expect(residents).toEqual(
      ["url:person2","url:person3"]
    );
  });

  it("should return cached residents", () => {
    const state = {
      byId: {"url:planet21": planet},
      allIds: ["url:planet21"]
    };
    selectors.getOtherResidentsCached(state, "url:person1", "url:planet21");
    const selector = selectors.getOtherResidentsCached.getMatchingSelector(state, "url:person1", "url:planet21");

    selector(state, "url:person1", "url:planet21");
    const residentsCached = selector(state, "url:person1", "url:planet21");

    expect(selector.recomputations()).toEqual(1);
    expect(residentsCached).toEqual(
      ["url:person2","url:person3"]
    );
  })

});