import LoginAnimation from '../../../Components/animations/LoginAnimation';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('<LoginAnimation />', () => {
  it('Render LoginAnimation', () => {
    const { getByLabelText } = render(<LoginAnimation />);
    expect(getByLabelText('LoginAnimation')).toBeInTheDocument();
  });
});
