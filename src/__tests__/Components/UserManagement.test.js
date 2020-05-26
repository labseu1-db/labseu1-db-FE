import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UserManagement from '../../Components/UserManagement';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  loadingTrue,
  getUserDataRealTime,
  getSpacesWithOrg,
  getOrgWithId,
  getUsersFromOrg,
  match
} from '../../__mocks__/index';

describe('<UserManagement />', () => {
  it('Render UserManagement User', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getUsersFromOrg: getUsersFromOrg,
            getOrgWithId: getOrgWithId,
            getSpacesWithOrg: getSpacesWithOrg
          }}
        >
          <UserManagement match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/User/)).toBeInTheDocument();
  });
});
