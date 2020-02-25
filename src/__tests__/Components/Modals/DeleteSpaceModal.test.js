import { render } from '@testing-library/react';
import React from 'react';
import { DeleteSpaceModal } from '../../../Components/Modals/DeleteSpaceModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen, space } from '../../../__mocks__/index';

describe('<DeleteSpaceModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <DeleteSpaceModal shoudlBeOpen={shoudlBeOpen} space={space} />
    );
    expect(getByLabelText(/Delete Space Modal/i)).toBeInTheDocument();
  });
});
