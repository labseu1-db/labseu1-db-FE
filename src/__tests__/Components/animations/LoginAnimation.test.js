import { render } from '@testing-library/react';
import React from 'react';
import LoginAnimation from '../../../Components/animations/LoginAnimation';
import '@testing-library/jest-dom/extend-expect';

describe('<LoginAnimation />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<LoginAnimation />);
    expect(getByLabelText(/Login Animation/i)).toBeInTheDocument();
  });
});
