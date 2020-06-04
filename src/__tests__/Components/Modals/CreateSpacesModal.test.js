import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateSpacesModal from '../../../Components/Modals/CreateSpacesModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import {
  emptyModal,
  match,
  getUserDataRealTime,
  getUsersFromOrg,
  isOpen,
  spaces
} from '../../../__mocks__/index';

describe('<CreateSpacesModal />', () => {
  it('Render OpenCreateNewSpaceModal', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{
          modal: emptyModal,
          getUserDataRealTime: getUserDataRealTime,
          getUsersFromOrg: getUsersFromOrg
        }}
      >
        <CreateSpacesModal
          match={match}
          createdSpaces={spaces}
          shoudlBeOpen={isOpen}
        />
      </Context.Provider>
    );
    expect(getByLabelText('CreateSpacesModal')).toBeInTheDocument();
  });
});
