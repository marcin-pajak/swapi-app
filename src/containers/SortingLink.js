import React from 'react';
import {connect} from 'react-redux';
import { setSorting } from '../actions/people';
import * as selectors from '../reducers/index'
import ButtonLink from '../components/ButtonLink/index';

const SortingLink = (props) => (
  <ButtonLink {...props}>{props.children}</ButtonLink>
);

const mapStateToProps = (
  state,
  ownProps
) => ({
    type: ownProps.type,
    isActive: ownProps.type === selectors.getCurrentSorting(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (type) => {
    dispatch(setSorting(type))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingLink);