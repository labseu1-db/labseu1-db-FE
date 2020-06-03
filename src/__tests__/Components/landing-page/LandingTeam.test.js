import LandingTeam from '../../../Components/landing-page/LandingTeam';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingTeam />', () => {
  it('Render LandingTeam', () => {
    const { getByLabelText } = render(<LandingTeam />);
    expect(getByLabelText('LandingTeam')).toBeInTheDocument();
  });
});
