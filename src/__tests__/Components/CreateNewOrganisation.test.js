import { render } from '@testing-library/react';
import React from 'react';
import { CreateNewOrganisation } from '../../Components/CreateNewOrganisation';
import '@testing-library/jest-dom/extend-expect';
import { showModal } from '../../__mocks__/index';

describe('<CreateNewOrganisation />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CreateNewOrganisation showModal={showModal} />
    );
    expect(getByLabelText(/Create New Org/i)).toBeInTheDocument();
  });
});
