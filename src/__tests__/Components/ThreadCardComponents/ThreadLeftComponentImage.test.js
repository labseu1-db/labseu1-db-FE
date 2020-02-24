import { render } from '@testing-library/react';
import React from 'react';
import ThreadLeftComponentImage from '../../../Components/reusable-components/ThreadCardComponents/ThreadLeftComponentImage';
import { heading, info } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ThreadLeftComponentImage />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ThreadLeftComponentImage />);
    expect(getByLabelText('Thread Left Image')).toBeInTheDocument();
  });
});
