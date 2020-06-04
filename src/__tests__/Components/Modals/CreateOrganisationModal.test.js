import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrganisationModal from '../../../Components/Modals/CreateOrganisationModal';
import { render } from '@testing-library/react';
import { isOpen } from '../../../__mocks__/index';

describe('<CreateOrganisationModal />', () => {
  it('Render CreateOrganisationModal', () => {
    const { getByLabelText } = render(
      <CreateOrganisationModal shoudlBeOpen={isOpen} />
    );
    expect(getByLabelText('CreateOrganisationModal')).toBeInTheDocument();
  });
});
