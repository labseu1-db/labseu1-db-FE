import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { resetPasswordStatus, match } from '../__mocks__/index';
import { App } from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<App />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Router>
        <App />
      </Router>
    );
    expect(getByLabelText(/App/i)).toBeInTheDocument();
  });
});
