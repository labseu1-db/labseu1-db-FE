import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ProfileCardOrgsField from '../../../../Components/reusable-components/ProfileCardComponents/ProfileCardOrgsField';
import { render } from '@testing-library/react';

describe('<ProfileCardOrgsField />', () => {
  it('Render ProfileCardOrgsField', () => {
    const { getByLabelText } = render(<ProfileCardOrgsField />);
    expect(getByLabelText('ProfileCardOrgsField')).toBeInTheDocument();
  });
});
