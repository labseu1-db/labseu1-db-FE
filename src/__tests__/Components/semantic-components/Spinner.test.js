import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Spinner from '../../../Components/semantic-components/Spinner';

describe('<Spinner />', () => {
  it('Render Spinner', () => {
    const { getByLabelText } = render(<Spinner />);
    expect(getByLabelText('Spinner')).toBeInTheDocument();
  });
});
