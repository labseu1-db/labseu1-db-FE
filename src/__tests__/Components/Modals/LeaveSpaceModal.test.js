import { render } from '@testing-library/react';
import React from 'react';
import { LeaveSpaceModal } from '../../../Components/Modals/LeaveSpaceModal';
import '@testing-library/jest-dom/extend-expect';
import { space, shoudlBeOpen } from '../../../__mocks__/index';

describe('<LeaveSpaceModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <LeaveSpaceModal space={space} shoudlBeOpen />
    );
    expect(getByLabelText(/Leave Space Modal/i)).toBeInTheDocument();
  });
});
