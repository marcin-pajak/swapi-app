import React from 'react';
import {connect} from 'react-redux';
import { setFilter } from '../actions/people';
import * as selectors from '../reducers/index'
import ButtonLink from '../components/ButtonLink/index';

const FilterLink = (props) => (
  <ButtonLink {...props}>{props.children}</ButtonLink>
);

const mapStateToProps = (
  state,
  ownProps
) => ({
  type: ownProps.type,
  isActive: ownProps.type === selectors.getCurrentFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (type) => {
    dispatch(setFilter(type))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLink);