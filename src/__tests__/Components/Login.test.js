import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../Components/Login';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  setError,
  loadingTrue,
  loadingFalse,
  isLoggedIn
} from '../../__mocks__/index';

describe('<Login />', () => {
  it('Render login page', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: setError,
            isLoggedIn: isLoggedIn,
            loading: loadingFalse
          }}
        >
          <Login />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Login page/i)).toBeInTheDocument();
  });
  it('Render Spinner on login page', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: setError,
            isLoggedIn: isLoggedIn,
            loading: loadingTrue
          }}
        >
          <Login />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Spinner/i)).toBeInTheDocument();
  });
});
