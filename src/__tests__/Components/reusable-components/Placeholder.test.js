import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Placeholder from '../../../Components/reusable-components/Placeholder';

describe('<Placeholder />', () => {
  it('Render Placeholder', () => {
    const { getByLabelText } = render(<Placeholder />);
    expect(getByLabelText('Placeholder')).toBeInTheDocument();
  });
});
