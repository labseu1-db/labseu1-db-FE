import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import SpaceThreads from '../../Components/SpaceThreads';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  setError,
  isLoggedIn,
  loadingFalse,
  loadingTrue,
  useMountEffect,
  getUserDataRealTime,
  getSpacesWithOrg,
  getOrgWithUuid,
  getUsersFromOrg,
  getThreadsWithOrg,
  match,
  getSpaceWithId,
  getThreadsWithSpace
} from '../../__mocks__/index';

describe('<SpaceThreads />', () => {
  it('Render SpaceThreads', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getSpaceWithId: getSpaceWithId,
            useMountEffect: useMountEffect,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getOrgWithUuid: getOrgWithUuid,
            getSpacesWithOrg: getSpacesWithOrg,
            getThreadsWithSpace: getThreadsWithSpace
          }}
        >
          <SpaceThreads match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/SpaceThreads/i)).toBeInTheDocument();
  });
});
