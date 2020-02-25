import { render } from '@testing-library/react';
import React from 'react';
import ProgressBar from '../../../Components/reusable-components/ProgressBar';
import '@testing-library/jest-dom/extend-expect';

describe('<ProgressBar />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ProgressBar />);
    expect(getByLabelText(/Progress Bar/i)).toBeInTheDocument();
  });
});
