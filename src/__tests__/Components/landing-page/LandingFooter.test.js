import LandingFooter from '../../../Components/landing-page/LandingFooter';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingFooter />', () => {
  it('Render LandingFooter', () => {
    const { getByLabelText } = render(<LandingFooter />);
    expect(getByLabelText('LandingFooter')).toBeInTheDocument();
  });
});
