import React from 'react';
import * as sorting from '../../../constants/SortTypes';

import SortingLink from '../../../containers/SortingLink';

const SortCharacters = () => (
  <div className="Home-bar">
    <ul className="List List--inline">
      <li className="List-item--clean">Sort:</li>
      <li>
        <SortingLink type={sorting.NONE}>None</SortingLink>
      </li>
      <li>
        <SortingLink type={sorting.NAME_ASC}>A &rarr; Z</SortingLink>
      </li>
      <li>
        <SortingLink type={sorting.AGE_ASC}>Youngest first</SortingLink>
      </li>
      <li>
        <SortingLink type={sorting.AGE_DESC}>Oldest first</SortingLink>
      </li>
    </ul>
  </div>
);

export default SortCharacters;


