import { render } from '@testing-library/react';
import React from 'react';
import GifComponent from '../../../Components/reusable-components/GifComponent';
import { fullName } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<GifComponent />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<GifComponent />);
    expect(getByLabelText(/Gif Component/i)).toBeInTheDocument();
  });
});
