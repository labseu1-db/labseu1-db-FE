import { render } from '@testing-library/react';
import React from 'react';
import CheckoutFormContainer from '../../Components/CheckoutFormContainer';
import '@testing-library/jest-dom/extend-expect';

describe('<CheckoutFormContainer />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<CheckoutFormContainer />);
    expect(getByLabelText(/Checkout Form Container/i)).toBeInTheDocument();
  });
});
