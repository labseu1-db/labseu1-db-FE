import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UpgradeAccount from '../../Components/UpgradeAccount';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  getUserDataRealTime,
  match,
  getUsersFromOrg,
  getOrgWithUuid,
  getOrgWithId,
  getSpacesWithOrg
} from '../../__mocks__/index';

describe('<UpgradeAccount />', () => {
  it('Render UpgradeAccount', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getOrgWithId: getOrgWithId,
            getUserDataRealTime: getUserDataRealTime,
            getUsersFromOrg: getUsersFromOrg,
            getOrgWithUuid: getOrgWithUuid,
            getSpacesWithOrg: getSpacesWithOrg
          }}
        >
          <UpgradeAccount match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/UpgradeAccount/i)).toBeInTheDocument();
  });
});
