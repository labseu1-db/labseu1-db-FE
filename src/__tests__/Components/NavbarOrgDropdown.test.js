import { render } from '@testing-library/react';
import React from 'react';
import { NavBarOrgDropdown } from '../../Components/NavBarOrgDropdown';
import '@testing-library/jest-dom/extend-expect';
import { showModal } from '../../__mocks__/index';

describe('<NavBarOrgDropdown />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<NavBarOrgDropdown />);
    expect(getByLabelText(/Nav Org Drop/i)).toBeInTheDocument();
  });
});
