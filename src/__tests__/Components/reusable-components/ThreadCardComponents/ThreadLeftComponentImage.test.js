import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadLeftComponentImage from '../../../../Components/reusable-components/ThreadCardComponents/ThreadLeftComponentImage';

describe('<ThreadLeftComponentImage />', () => {
  it('Render ThreadLeftComponentImage', () => {
    const { getByLabelText } = render(<ThreadLeftComponentImage />);
    expect(getByLabelText('ThreadLeftComponentImage')).toBeInTheDocument();
  });
});
