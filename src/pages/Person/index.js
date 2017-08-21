import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { fetchPersonIfNeeded } from '../../actions/person';
import * as selectors from '../../reducers/index'
import Detail from '../../components/Detail/index';

import { routeToUrl } from '../../helpers/pathHelper';

class PersonPage extends Component {
  componentWillMount () {
    window.scroll(0,0);
    this.props.fetchPersonIfNeeded(this.props.url)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.url !== this.props.url) {
      window.scroll(0,0);
    }
  }

  render () {
    return (
      <div className="Wrapper">
        <p><NavLink to="/">&larr; Go back to catalogue</NavLink></p>
        <Detail {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (
  state,
  ownProps
) => {
  const url = routeToUrl(ownProps.match.params.person);
  const person = selectors.getPersonByUrl(state, url);
  const planet = person ? selectors.getPlanetByUrl(state, person.homeworld) : null;
  const otherResidents = planet ? selectors.getOtherResidents(state, person) : [];
  return {
    url,
    person,
    planet,
    otherResidents
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPersonIfNeeded }
  )(PersonPage)
);