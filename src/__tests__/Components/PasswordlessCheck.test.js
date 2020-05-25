import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import PasswordlessCheck from '../../Components/PasswordlessCheck';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  getUserDataRealTime,
  match,
  getUsersFromOrg,
  getOrgWithUuid,
  getOrgWithId,
  getSpacesWithOrg,
  firebase,
  isLoggedIn
} from '../../__mocks__/index';

describe('<PasswordlessCheck />', () => {
  it('Render PasswordlessCheck', () => {
    window.prompt = jest.fn();
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{ firebase: firebase, isLoggedIn: isLoggedIn }}
        >
          <PasswordlessCheck />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/PasswordlessCheck/i)).toBeInTheDocument();
    window.prompt.mockClear();
  });
});
