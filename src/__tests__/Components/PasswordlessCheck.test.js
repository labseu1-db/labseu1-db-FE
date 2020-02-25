import { render } from '@testing-library/react';
import React from 'react';
import { PasswordlessCheck } from '../../Components/PasswordlessCheck';
import '@testing-library/jest-dom/extend-expect';
import { firebase } from '../../__mocks__/index';

describe('<PasswordlessCheck />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <PasswordlessCheck firebase={firebase} />
    );
    expect(getByLabelText(/Passwordless Check/i)).toBeInTheDocument();
  });
});
