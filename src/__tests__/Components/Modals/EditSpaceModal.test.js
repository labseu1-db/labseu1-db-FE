import { render } from '@testing-library/react';
import React from 'react';
import { EditSpaceModal } from '../../../Components/Modals/EditSpaceModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen, space, users } from '../../../__mocks__/index';

describe('<EditSpaceModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <EditSpaceModal
        shoudlBeOpen={shoudlBeOpen}
        space={space}
        listOfUsersWithinTheOrg={users}
      />
    );
    expect(getByLabelText(/Edit Space Modal/i)).toBeInTheDocument();
  });
});
