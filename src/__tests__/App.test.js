import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<App />', () => {
  it('Render Landing Page', () => {
    const { getByLabelText } = render(
      <Router>
        <App />
      </Router>
    );
    expect(getByLabelText(/Landing Page/i)).toBeInTheDocument();
  });
});
