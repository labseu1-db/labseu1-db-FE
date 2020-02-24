import { render } from '@testing-library/react';
import React from 'react';
import LandingMidBanner from '../../../Components/landing-page/LandingMidBanner';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingMidBanner />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingMidBanner />);
    expect(getByLabelText(/Landing Mid Banner/i)).toBeInTheDocument();
  });
});
