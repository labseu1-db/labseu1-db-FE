import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CheckoutFormContainer from '../../Components/CheckoutFormContainer';
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

describe('<CheckoutFormContainer />', () => {
  it('Render OpenModal Button', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider>
          <CheckoutFormContainer />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('OpenModal')).toBeInTheDocument();
  });
});
