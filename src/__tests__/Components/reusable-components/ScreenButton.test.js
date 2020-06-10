import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ScreenButton from '../../../Components/reusable-components/ScreenButton';

describe('<ScreenButton />', () => {
  it('Render ScreenButton', () => {
    const { getByLabelText } = render(<ScreenButton />);
    expect(getByLabelText('ScreenButton')).toBeInTheDocument();
  });
});
