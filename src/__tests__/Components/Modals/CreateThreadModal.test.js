import { render } from '@testing-library/react';
import React from 'react';
import { CreateThreadModal } from '../../../Components/Modals/CreateThreadModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen, spaces } from '../../../__mocks__/index';

describe('<CreateThreadModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CreateThreadModal
        shoudlBeOpen={shoudlBeOpen}
        spacesForActiveOrg={spaces}
      />
    );
    expect(getByLabelText(/Create Thread Modal/i)).toBeInTheDocument();
  });
});
