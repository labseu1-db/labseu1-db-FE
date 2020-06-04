import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateNewSpaceModal from '../../../Components/Modals/CreateNewSpaceModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import {
  emptyModal,
  newSpaceModal,
  match,
  getUserDataRealTime,
  getUsersFromOrg
} from '../../../__mocks__/index';

describe('<CreateNewSpaceModal />', () => {
  it('Render CreateNewSpaceModal Button', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{
          modal: emptyModal,
          getUserDataRealTime: getUserDataRealTime,
          getUsersFromOrg: getUsersFromOrg
        }}
      >
        <CreateNewSpaceModal match={match} />
      </Context.Provider>
    );
    expect(getByLabelText('OpenCreateNewSpaceModal')).toBeInTheDocument();
  });
  it('Render CreateNewSpaceModal', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{
          modal: newSpaceModal,
          getUserDataRealTime: getUserDataRealTime,
          getUsersFromOrg: getUsersFromOrg
        }}
      >
        <CreateNewSpaceModal match={match} />
      </Context.Provider>
    );
    expect(getByLabelText('CreateNewSpaceModal')).toBeInTheDocument();
  });
});
