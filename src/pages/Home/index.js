import './Home.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PeopleListContainer from '../../containers/PeopleList';
import { fetchPeopleIfNeeded } from '../../actions/people';
import SortCharacters from './partials/SortCharacters';
import FilterCharacters from './partials/FilterCharacters';

export class HomePage extends Component {
  componentWillMount () {
    this.props.fetchPeopleIfNeeded();
  }

  render() {
    return (
      <section className="Home">
        <div className="Wrapper">
          <h1>StarWars Characters Catalogue</h1>
          <div className="Home-bars">
            <FilterCharacters />
            <SortCharacters />
          </div>
          <PeopleListContainer />
        </div>
      </section>
    )
  }
}

export default connect(
  null,
  { fetchPeopleIfNeeded }
)(HomePage);