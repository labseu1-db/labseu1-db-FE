import LandingPage from '../../../Components/landing-page/LandingPage';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingPage />', () => {
  it('Render LandingPage', () => {
    const { getByLabelText } = render(<LandingPage />);
    expect(getByLabelText('LandingPage')).toBeInTheDocument();
  });
});
