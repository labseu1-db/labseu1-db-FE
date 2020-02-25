import { render } from '@testing-library/react';
import React from 'react';
import AvatarFromLetter from '../../../Components/reusable-components/AvatarFromLetter';
import { fullName } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<AvatarFromLetter />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<AvatarFromLetter username={fullName} />);
    expect(getByLabelText(/Avatar Letter/i)).toBeInTheDocument();
  });
});
