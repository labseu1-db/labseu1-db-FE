import { render } from '@testing-library/react';
import React from 'react';
import { Login } from '../../Components/Login';
import '@testing-library/jest-dom/extend-expect';
import { auth } from '../../__mocks__/index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Login />', () => {
  it('should render', () => {
    const { getAllByLabelText } = render(
      <Router>
        <Login auth={auth} />
      </Router>
    );
    expect(getAllByLabelText(/Login/i)[0]).toBeInTheDocument();
  });
});
