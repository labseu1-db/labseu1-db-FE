import { render } from '@testing-library/react';
import React from 'react';
import { ProfileCardUserRow } from '../../../Components/reusable-components/ProfileCardComponents/ProfileCardUserRow';
import { user } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ProfileCardUserRow />', () => {
  it('should render component', () => {
    const { getByLabelText } = render(<ProfileCardUserRow user={user} />);
    expect(getByLabelText(/full name/i)).toBeInTheDocument();
  });
});
