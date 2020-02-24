import { render } from '@testing-library/react';
import React from 'react';
import ThreadLeftComponentText from '../../../Components/reusable-components/ThreadCardComponents/ThreadLeftComponentText';
import { heading, info } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ThreadLeftComponentText />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ThreadLeftComponentText />);
    expect(getByLabelText('Thread Left Text')).toBeInTheDocument();
  });
});
