import { render } from '@testing-library/react';
import React from 'react';
import { ProfileCardButton } from '../../../../Components/reusable-components/ProfileCardComponents/ProfileCardButton';
import { user } from '../../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ProfileCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ProfileCardButton />);
    expect(getByLabelText(/profile button/i)).toBeInTheDocument();
  });
});
