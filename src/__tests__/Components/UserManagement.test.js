import { render } from '@testing-library/react';
import React from 'react';
import { UserManagement } from '../../Components/UserManagement';
import '@testing-library/jest-dom/extend-expect';
import { org, userArray } from '../../__mocks__/index';

describe('<UserManagement />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <UserManagement organisation={org} listOfUsersWithinTheOrg={userArray} />
    );
    expect(getByLabelText(/User Management/i)).toBeInTheDocument();
  });
});
