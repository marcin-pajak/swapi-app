import React from 'react';
import {connect} from 'react-redux';
import { getVisiblePeople, hasMorePeople, getIsFetching, getPeopleError } from '../reducers/index';
import Card from '../components/PersonCard';
import Spinner from '../components/Spinner';

import { fetchPeople } from '../actions/people';

const PeopleListContainer = ({people, error, hasMore, isFetching, onLoadMore}) => {
  if (error) {
    return (<div className="Error Error--big">
        <p className="Error-message">{error.message}</p>
        <p className="Error-message">Please try to refresh the page.</p>
      </div>)
  }

  const spinnerPart = isFetching ? (
    <Spinner />
  ) : null;

  const loaderPart = hasMore ? (
    <div className="u-text--center">
      <button
        className="Button Button--primary"
        disabled={isFetching}
        onClick={onLoadMore}
      >
        Load more
      </button>
    </div>
  ) : null;

  const peopleListPart = (
    <ul className="List Grid">
      {people.map(card => {
        return (
          <li className="Grid-cell Cell-1of2" key={card.url}>
            <Card person={card} />
          </li>
        )
      })}
    </ul>
  );

  return (
    <section>
      { peopleListPart }
      { spinnerPart }
      { loaderPart }
    </section>
  );
};

const mapStateToProps = (
  state,
  ownProps
) => ({
  error: getPeopleError(state),
  people: getVisiblePeople(state),
  hasMore: hasMorePeople(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMore: () => {
    dispatch(fetchPeople());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleListContainer);
