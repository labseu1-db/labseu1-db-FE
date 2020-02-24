import { render } from '@testing-library/react';
import React from 'react';
import LandingPricing from '../../../Components/landing-page/LandingPricing';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingPricing />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingPricing />);
    expect(getByLabelText(/Landing Pricing/i)).toBeInTheDocument();
  });
});
