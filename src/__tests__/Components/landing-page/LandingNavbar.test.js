import LandingNavbar from '../../../Components/landing-page/LandingNavbar';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingNavbar />', () => {
  it('Render LandingNavbar', () => {
    const { getByLabelText } = render(<LandingNavbar />);
    expect(getByLabelText('LandingNavbar')).toBeInTheDocument();
  });
});
