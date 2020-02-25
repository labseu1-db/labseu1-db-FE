import { render } from '@testing-library/react';
import React from 'react';
import Spinner from '../../../Components/semantic-components/Spinner';
import '@testing-library/jest-dom/extend-expect';

describe('<Spinner />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<Spinner />);
    expect(getByLabelText(/Spinner/i)).toBeInTheDocument();
  });
});
