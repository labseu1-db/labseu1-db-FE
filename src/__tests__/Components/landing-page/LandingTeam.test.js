import { render } from '@testing-library/react';
import React from 'react';
import LandingTeam from '../../../Components/landing-page/LandingTeam';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingTeam />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingTeam />);
    expect(getByLabelText(/Landing Team/i)).toBeInTheDocument();
  });
});
