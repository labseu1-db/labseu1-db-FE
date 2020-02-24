import { render } from '@testing-library/react';
import React from 'react';
import LandingBanner from '../../../Components/landing-page/LandingBanner';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingBanner />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingBanner />);
    expect(getByLabelText(/Landing Banner/i)).toBeInTheDocument();
  });
});
