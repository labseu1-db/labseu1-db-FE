import { render } from '@testing-library/react';
import React from 'react';
import LandingFooter from '../../../Components/landing-page/LandingFooter';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingFooter />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingFooter />);
    expect(getByLabelText(/Landing Footer/i)).toBeInTheDocument();
  });
});
