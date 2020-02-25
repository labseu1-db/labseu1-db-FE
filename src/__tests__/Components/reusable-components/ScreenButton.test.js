import { render } from '@testing-library/react';
import React from 'react';
import ScreenButton from '../../../Components/reusable-components/ScreenButton';
import '@testing-library/jest-dom/extend-expect';

describe('<ScreenButton />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ScreenButton />);
    expect(getByLabelText(/Screen Button/i)).toBeInTheDocument();
  });
});
