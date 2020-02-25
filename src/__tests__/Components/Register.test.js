import { render } from '@testing-library/react';
import React from 'react';
import { Register } from '../../Components/Register';
import '@testing-library/jest-dom/extend-expect';
import { auth } from '../../__mocks__/index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Register />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Router>
        <Register auth={auth} />
      </Router>
    );
    expect(getByLabelText(/Register/i)).toBeInTheDocument();
  });
});
