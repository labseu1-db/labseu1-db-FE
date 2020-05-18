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
  useMountEffect,
  getUserDataRealTime,
  getSpacesWithOrg,
  getOrgWithUuid,
  getUsersFromOrg,
  getThreadsWithOrg
} from '../../__mocks__/index';
import paramCase from 'param-case';

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
          <MainScreen match={{ params: { id: 22 } }} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/MainScreen/i)).toBeInTheDocument();
  });
});
