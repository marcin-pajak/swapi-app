import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPersonIfNeeded } from '../actions/person';
import * as selectors from '../reducers/index'
import '../components/PersonCard/PersonCard.css';
import Card from '../components/PersonCard/index';

class PersonCardContainer extends Component {
  componentWillMount () {
    const { fetchPersonIfNeeded, url } = this.props;
    fetchPersonIfNeeded(url);
  }

  render () {
    return (
      <Card {...this.props} />
    )
  }
}

const mapStateToProps = (
  state,
  ownProps
) => ({
  person: selectors.getPersonByUrl(state, ownProps.url)
});

export default connect(
  mapStateToProps,
  { fetchPersonIfNeeded }
)(PersonCardContainer);