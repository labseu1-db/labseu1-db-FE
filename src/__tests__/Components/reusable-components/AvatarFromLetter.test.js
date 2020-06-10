import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AvatarFromLetter from '../../../Components/reusable-components/AvatarFromLetter';
import { user } from '../../../__mocks__/index';

describe('<AvatarFromLetter />', () => {
  it('Render AvatarFromLetter', () => {
    const { getByLabelText } = render(
      <AvatarFromLetter username={user.username} />
    );
    expect(getByLabelText('AvatarFromLetter')).toBeInTheDocument();
  });
});
