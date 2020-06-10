import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ScreenSectionHeading from '../../../Components/reusable-components/ScreenSectionHeading';

describe('<ScreenSectionHeading />', () => {
  it('Render ScreenSectionHeading', () => {
    const { getByLabelText } = render(<ScreenSectionHeading />);
    expect(getByLabelText('ScreenSectionHeading')).toBeInTheDocument();
  });
});
