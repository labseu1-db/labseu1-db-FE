import { render } from '@testing-library/react';
import React from 'react';
import { PasswordlessSubmit } from '../../Components/PasswordlessSubmit';
import '@testing-library/jest-dom/extend-expect';
import { auth } from '../../__mocks__/index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<PasswordlessSubmit />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Router>
        <PasswordlessSubmit auth={auth} />
      </Router>
    );
    expect(getByLabelText(/Passwordless Submit/i)).toBeInTheDocument();
  });
});
