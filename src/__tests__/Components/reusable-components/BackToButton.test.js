import { render } from '@testing-library/react';
import React from 'react';
import BackToButton from '../../../Components/reusable-components/BackToButton';
import '@testing-library/jest-dom/extend-expect';

describe('<BackToButton />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<BackToButton />);
    expect(getByLabelText(/Back Button/i)).toBeInTheDocument();
  });
});
