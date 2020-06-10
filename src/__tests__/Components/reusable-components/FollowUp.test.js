import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import FollowUp from '../../../Components/reusable-components/FollowUp';
import Context from '../../../Components/ContextProvider/Context';
import {
  getFollowUpThreads,
  useMountEffect,
  match,
  getUsersFromOrg,
  getUserDataRealTime,
  getOrgWithUuid,
  getSpacesWithOrg
} from '../../../__mocks__/index';
import { MemoryRouter } from 'react-router-dom';

describe('<FollowUp />', () => {
  it('Render FollowUp', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider
          value={{
            getFollowUpThreads: getFollowUpThreads,
            useMountEffect: useMountEffect,
            getUsersFromOrg: getUsersFromOrg,
            getUserDataRealTime: getUserDataRealTime,
            getOrgWithUuid: getOrgWithUuid,
            getSpacesWithOrg: getSpacesWithOrg
          }}
        >
          <FollowUp match={match} />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('FollowUp')).toBeInTheDocument();
  });
});
