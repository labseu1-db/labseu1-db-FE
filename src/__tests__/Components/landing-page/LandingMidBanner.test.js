import LandingMidBanner from '../../../Components/landing-page/LandingMidBanner';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingMidBanner />', () => {
  it('Render LandingMidBanner />', () => {
    const { getByLabelText } = render(<LandingMidBanner />);
    expect(getByLabelText('LandingMidBanner')).toBeInTheDocument();
  });
});
