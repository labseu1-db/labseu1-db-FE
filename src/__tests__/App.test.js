import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('<App />', () => {
  it('Render landing page', () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(getByLabelText('LandingPage')).toBeInTheDocument();
  });
  it('Render login page', () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(getByLabelText(/Login page/i)).toBeInTheDocument();
  });
  it('Render register page', () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(getByLabelText(/Register page/i)).toBeInTheDocument();
  });
});
