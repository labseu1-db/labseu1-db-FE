import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from '../../Components/NavBar';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  loadingTrue,
  getUserDataRealTime,
  getSpacesWithOrg,
  getOrgWithUuid,
  getUsersFromOrg,
  match
} from '../../__mocks__/index';

describe('<NavBar />', () => {
  it('Render NavBar', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getOrgWithUuid: getOrgWithUuid,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getSpacesWithOrg: getSpacesWithOrg
          }}
        >
          <NavBar match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('NavBar')).toBeInTheDocument();
  });
  it('Render Spinner instead of spaces', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getOrgWithUuid: getOrgWithUuid,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getSpacesWithOrg: getSpacesWithOrg,
            loading: loadingTrue
          }}
        >
          <NavBar match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Spinner/)).toBeInTheDocument();
  });
});
