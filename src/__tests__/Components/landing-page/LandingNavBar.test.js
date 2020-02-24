import { render } from '@testing-library/react';
import React from 'react';
import LandingNavBar from '../../../Components/landing-page/LandingNavBar';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingNavBar />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingNavBar />);
    expect(getByLabelText(/Landing Nav/i)).toBeInTheDocument();
  });
});
