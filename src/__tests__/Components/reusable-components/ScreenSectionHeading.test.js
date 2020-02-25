import { render } from '@testing-library/react';
import React from 'react';
import ScreenSectionHeading from '../../../Components/reusable-components/ScreenSectionHeading';
import '@testing-library/jest-dom/extend-expect';

describe('<ScreenSectionHeading />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ScreenSectionHeading />);
    expect(getByLabelText(/Screen Section Heading/i)).toBeInTheDocument();
  });
});
