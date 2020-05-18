import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../Components/Login';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('<Login />', () => {
  it('Render login page', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: () => {},
            isLoggedIn: () => {},
            loading: false
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
            setError: () => {},
            isLoggedIn: () => {},
            loading: true
          }}
        >
          <Login />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Spinner/i)).toBeInTheDocument();
  });
});
