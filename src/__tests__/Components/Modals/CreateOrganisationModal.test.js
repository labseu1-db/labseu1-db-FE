import { render } from '@testing-library/react';
import React from 'react';
import CreateOrganisationModal from '../../../Components/Modals/CreateOrganisationModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen } from '../../../__mocks__/index';

describe('<CreateOrganisationModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CreateOrganisationModal shoudlBeOpen={shoudlBeOpen} />
    );
    expect(getByLabelText(/Create Org/i)).toBeInTheDocument();
    // expect(getByLabelText(/New Space Modal/i)).toBeInTheDocument();
  });
});
