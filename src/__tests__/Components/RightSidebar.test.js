import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RightSidebar from '../../Components/RightSidebar';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  loadingTrue,
  getUserDataRealTime,
  getSpacesWithOrg,
  getOrgWithUuid,
  getUsersFromOrg,
  match
} from '../../__mocks__/index';

describe('<RightSidebar', () => {
  it('Render RightSidebar', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider>
          <RightSidebar />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText(/Right Sidebar/i)).toBeInTheDocument();
  });
});
