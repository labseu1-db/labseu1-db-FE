import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import EditSpaceModal from '../../../Components/Modals/EditSpaceModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import {
  closeModal,
  space,
  match,
  getUserDataRealTime,
  getUsersFromOrg,
  isOpen
} from '../../../__mocks__/index';

describe('<EditSpaceModal />', () => {
  it('Render EditSpaceModal', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{
          closeModal: closeModal,
          getUserDataRealTime: getUserDataRealTime,
          getUsersFromOrg: getUsersFromOrg
        }}
      >
        <EditSpaceModal space={space} match={match} shoudlBeOpen={isOpen} />
      </Context.Provider>
    );
    expect(getByLabelText('EditSpaceModal')).toBeInTheDocument();
  });
});
