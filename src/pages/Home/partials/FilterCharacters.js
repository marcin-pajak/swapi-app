import React from 'react';
import * as filters from '../../../constants/FilterTypes';

import FilterLink from '../../../containers/FilterLink';

const SortCharacters = () => (
  <div className="Home-bar">
    <ul className="List List--inline">
      <li className="List-item--clean">
        <span>Filter:</span>
      </li>
      <li>
        <FilterLink type={filters.NONE}>All</FilterLink>
      </li>
      <li>
        <FilterLink type={filters.FEMALE}>Female</FilterLink>
      </li>
      <li>
        <FilterLink type={filters.MALE}>Male</FilterLink>
      </li>
      <li>
        <FilterLink type={filters.NO_GENDER}>N/A</FilterLink>
      </li>
    </ul>
  </div>
);

export default SortCharacters;




