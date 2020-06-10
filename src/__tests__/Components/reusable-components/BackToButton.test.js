import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BackToButton from '../../../Components/reusable-components/BackToButton';

describe('<BackToButton />', () => {
  it('Render BackToButton', () => {
    const { getByLabelText } = render(<BackToButton />);
    expect(getByLabelText('BackToButton')).toBeInTheDocument();
  });
});
