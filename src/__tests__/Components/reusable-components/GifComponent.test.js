import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import GifComponent from '../../../Components/reusable-components/GifComponent';

describe('<GifComponent />', () => {
  it('Render GifComponent', () => {
    const { getByLabelText } = render(<GifComponent />);
    expect(getByLabelText('GifComponent')).toBeInTheDocument();
  });
});
