import { render } from '@testing-library/react';
import React from 'react';
import LandingContent from '../../../Components/landing-page/LandingContent';
import '@testing-library/jest-dom/extend-expect';

describe('<LandingConent />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LandingContent />);
    expect(getByLabelText(/Landing Content/i)).toBeInTheDocument();
  });
});
