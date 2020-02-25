import { render } from '@testing-library/react';
import React from 'react';
import { ForgotPassword } from '../../Components/ForgotPassword';
import '@testing-library/jest-dom/extend-expect';
import { firestore } from '../../__mocks__/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('<ForgotPassword />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Router>
        <ForgotPassword firestore={firestore} />
      </Router>
    );
    expect(getByLabelText(/Forgot Password/i)).toBeInTheDocument();
  });
});
