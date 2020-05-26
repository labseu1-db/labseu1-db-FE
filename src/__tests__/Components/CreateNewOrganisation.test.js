import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateNewOrganisation from '../../Components/CreateNewOrganisation';
import Context from '../../Components/ContextProvider/Context';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { setModal } from '../../__mocks__/index';

describe('<CreateNewOrganisation />', () => {
  it('Render CreateNewOrganisation', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Context.Provider value={{ setModal: setModal }}>
          <CreateNewOrganisation />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(getByLabelText('CreateNewOrganisation')).toBeInTheDocument();
  });
});
