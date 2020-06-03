import LandingContent from '../../../Components/landing-page/LandingContent';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LandingContext />', () => {
  it('Render LandingContest', () => {
    const { getByLabelText } = render(<LandingContent />);
    expect(getByLabelText('LandingContent')).toBeInTheDocument();
  });
});
