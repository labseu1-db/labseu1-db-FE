import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ThreadsScreen from '../../Components/ThreadsScreen';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  setError,
  loadingTrue,
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
  getThreadWithId
} from '../../__mocks__/index';

describe('<ThreadsScreen />', () => {
  it('Render ThreadsScreen', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: setError,
            isLoggedIn: isLoggedIn,
            useMountEffect: useMountEffect,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getOrgWithUuid: getOrgWithUuid,
            getSpacesWithOrg: getSpacesWithOrg,
            updateDataWithDoc: updateDataWithDoc,
            getCommentsWithThread: getCommentsWithThread,
            getThreadWithId: getThreadWithId
          }}
        >
          <ThreadsScreen match={match} history={history} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/ThreadsScreen/i)).toBeInTheDocument();
  });
});
