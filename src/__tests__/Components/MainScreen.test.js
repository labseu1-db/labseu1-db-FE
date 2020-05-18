import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import MainScreen from '../../Components/MainScreen';
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
  match
} from '../../__mocks__/index';

describe('<MainScreen />', () => {
  it('Render MainScreen', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: setError,
            isLoggedIn: isLoggedIn,
            loading: loadingFalse,
            useMountEffect: useMountEffect,
            getUserDataRealTime: getUserDataRealTime,
            getSpacesWithOrg: getSpacesWithOrg,
            getOrgWithUuid: getOrgWithUuid,
            getUsersFromOrg: getUsersFromOrg,
            getThreadsWithOrg: getThreadsWithOrg
          }}
        >
          <MainScreen match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/MainScreen/i)).toBeInTheDocument();
  });
  it('Render spinner instead of Threads', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: setError,
            isLoggedIn: isLoggedIn,
            loading: loadingTrue,
            useMountEffect: useMountEffect,
            getUserDataRealTime: getUserDataRealTime,
            getSpacesWithOrg: getSpacesWithOrg,
            getOrgWithUuid: getOrgWithUuid,
            getUsersFromOrg: getUsersFromOrg,
            getThreadsWithOrg: getThreadsWithOrg
          }}
        >
          <MainScreen match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Threads spinner/i)).toBeInTheDocument();
  });
});
