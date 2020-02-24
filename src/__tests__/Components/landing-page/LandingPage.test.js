import { render } from '@testing-library/react';
import React from 'react';
import LandingPage from '../../../Components/landing-page/LandingPage';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingPage />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingPage />);
    expect(getByLabelText(/Landing Page/i)).toBeInTheDocument();
  });
});
