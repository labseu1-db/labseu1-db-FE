import LandingBanner from '../../../Components/landing-page/LandingBanner';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingBanner />', () => {
  it('Render LandingBanner', () => {
    const { getByLabelText } = render(<LandingBanner />);
    expect(getByLabelText('LandingBanner')).toBeInTheDocument();
  });
});
