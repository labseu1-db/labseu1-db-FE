import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ProgressBar from '../../../Components/reusable-components/ProgressBar';

describe('<ProgressBar />', () => {
  it('Render ProgressBar', () => {
    const { getByLabelText } = render(<ProgressBar />);
    expect(getByLabelText('ProgressBar')).toBeInTheDocument();
  });
});
