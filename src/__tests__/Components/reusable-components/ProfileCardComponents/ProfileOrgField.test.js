import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ProfileOrgField from '../../../../Components/reusable-components/ProfileCardComponents/ProfileOrgField';
import { render } from '@testing-library/react';
import { org, user } from '../../../../__mocks__/index';

describe('<ProfileOrgField />', () => {
  it('Render ProfileOrgField', () => {
    const { getByLabelText } = render(
      <ProfileOrgField org={org} user={user} />
    );
    expect(getByLabelText('ProfileOrgField')).toBeInTheDocument();
  });
});
