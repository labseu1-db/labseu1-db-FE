import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ProfileCardButton from '../../../../Components/reusable-components/ProfileCardComponents/ProfileCardButton';
import { render } from '@testing-library/react';

describe('<ProfileCardButton />', () => {
  it('Render ProfileCardButton', () => {
    const { getByLabelText } = render(<ProfileCardButton />);
    expect(getByLabelText('ProfileCardButton')).toBeInTheDocument();
  });
});
