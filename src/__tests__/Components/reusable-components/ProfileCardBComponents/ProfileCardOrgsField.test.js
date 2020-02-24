import { render } from '@testing-library/react';
import React from 'react';
import { ProfileCardOrgsField } from '../../../../Components/reusable-components/ProfileCardComponents/ProfileCardOrgsField';
import { orgs, user } from '../../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ProfileCardOrgsField />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <ProfileCardOrgsField orgs={orgs} user={user} />
    );
    expect(getByLabelText(/Orgs Field/i)).toBeInTheDocument();
  });
});
