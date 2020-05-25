import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import PasswordlessSubmit from '../../Components/PasswordlessSubmit';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { isLoggedIn, error } from '../../__mocks__/index';

describe('<PasswordlessSubmit />', () => {
  it('Render PasswordlessSubmit', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider value={{ error: error, isLoggedIn: isLoggedIn }}>
          <PasswordlessSubmit />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/PasswordlessSubmit/i)).toBeInTheDocument();
  });
});
