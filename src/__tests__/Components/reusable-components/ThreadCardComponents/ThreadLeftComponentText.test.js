import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadLeftComponentText from '../../../../Components/reusable-components/ThreadCardComponents/ThreadLeftComponentText';

describe('<ThreadLeftComponentText />', () => {
  it('Render ThreadLeftComponentText', () => {
    const { getByLabelText } = render(<ThreadLeftComponentText />);
    expect(getByLabelText('ThreadLeftComponentText')).toBeInTheDocument();
  });
});
