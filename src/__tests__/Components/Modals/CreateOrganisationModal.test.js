import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrganisationModal from '../../../Components/Modals/CreateOrganisationModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { isOpen } from '../../../__mocks__/index';

describe('<CreateOrganisationModal />', () => {
  it('Render CreateOrganisationModal', () => {
    const { getByLabelText } = render(
      <Context.Provider>
        <CreateOrganisationModal shoudlBeOpen={isOpen} />
      </Context.Provider>
    );
    expect(getByLabelText('CreateOrganisationModal')).toBeInTheDocument();
  });
});
