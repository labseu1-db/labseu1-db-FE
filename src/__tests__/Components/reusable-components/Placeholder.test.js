import { render } from '@testing-library/react';
import React from 'react';
import Placeholder from '../../../Components/reusable-components/Placeholder';
import { fullName } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<Placeholder />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<Placeholder />);
    expect(getByLabelText(/Place Holder/i)).toBeInTheDocument();
  });
});
