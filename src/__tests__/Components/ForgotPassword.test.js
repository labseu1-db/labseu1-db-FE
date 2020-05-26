import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from '../../Components/ForgotPassword';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { match, redirect } from '../../__mocks__/index';

describe('<ForgotPassword />', () => {
  it('Render ForgotPassword', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider value={{ redirect: redirect }}>
          <ForgotPassword match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('ForgotPassword')).toBeInTheDocument();
  });
});
