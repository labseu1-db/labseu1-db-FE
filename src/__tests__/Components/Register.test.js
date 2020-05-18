import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../Components/Register';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('<Regiset />', () => {
  it('Render Register page', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            setError: () => {},
            isLoggedIn: () => {},
            loading: false
          }}
        >
          <Register />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Register page/i)).toBeInTheDocument();
  });
});
