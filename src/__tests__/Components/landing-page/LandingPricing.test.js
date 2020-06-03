import LandingPricing from '../../../Components/landing-page/LandingPricing';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingPricing />', () => {
  it('Render LandingPricing', () => {
    const { getByLabelText } = render(<LandingPricing />);
    expect(getByLabelText('LandingPricing')).toBeInTheDocument();
  });
});
