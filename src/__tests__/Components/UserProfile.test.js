import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../../Components/UserProfile';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  setError,
  getUserDataRealTime,
  isLoggedIn,
  useMountEffect,
  match,
  history,
  getUsersFromOrg,
  getOrgWithUuid,
  getSpacesWithOrg,
  updateDataWithDoc,
  getCommentsWithThread,
  getThreadWithId,
  resetPasswordStatusFalse
} from '../../__mocks__/index';

describe('<UserProfile />', () => {
  it('Render UserProfile', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            resetPasswordStatus: resetPasswordStatusFalse,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getOrgWithUuid: getOrgWithUuid,
            getSpacesWithOrg: getSpacesWithOrg
          }}
        >
          <UserProfile match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/UserProfile/i)).toBeInTheDocument();
  });
});
