import { render } from '@testing-library/react';
import React from 'react';
import { ProfileOrgField } from '../../../../Components/reusable-components/ProfileCardComponents/ProfileOrgField';
import { user, org } from '../../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ProfileOrgField />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <ProfileOrgField user={user} org={org} />
    );
    expect(getByLabelText(/Org Field/i)).toBeInTheDocument();
  });
});
