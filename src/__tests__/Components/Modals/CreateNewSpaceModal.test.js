import { render } from '@testing-library/react';
import React from 'react';
import { CreateNewSpaceModal } from '../../../Components/Modals/CreateNewSpaceModal';
import '@testing-library/jest-dom/extend-expect';
import { org, users } from '../../../__mocks__/index';

describe('<CreateNewSpaceModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CreateNewSpaceModal organisation={org} listOfUsersWithinTheOrg={users} />
    );
    expect(getByLabelText(/New Space Modal/i)).toBeInTheDocument();
    // expect(getByLabelText(/New Space Modal/i)).toBeInTheDocument();
  });
});
