import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { NavBarOrgDropdown } from '../../Components/NavBarOrgDropdown';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  getUserDataRealTime,
  match,
  getUsersFromOrg,
  getOrgWithUuid,
  getOrgWithId,
  getSpacesWithOrg
} from '../../__mocks__/index';

describe('<NavBarOrgDropdown />', () => {
  it('Render NavBarOrgDropdown', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider>
          <NavBarOrgDropdown />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('NavBarOrgDropdown')).toBeInTheDocument();
  });
});
