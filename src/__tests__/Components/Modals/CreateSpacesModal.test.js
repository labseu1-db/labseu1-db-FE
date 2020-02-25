import { render } from '@testing-library/react';
import React from 'react';
import CreateSpacesModal from '../../../Components/Modals/CreateSpacesModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen, spaces } from '../../../__mocks__/index';

describe('<CreateSpacesModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CreateSpacesModal shoudlBeOpen={shoudlBeOpen} createdSpaces={spaces} />
    );
    expect(getByLabelText(/Create Spaces Modal/i)).toBeInTheDocument();
  });
});
