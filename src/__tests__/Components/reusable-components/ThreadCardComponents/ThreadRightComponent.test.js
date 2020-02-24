import { render } from '@testing-library/react';
import React from 'react';
import { ThreadRightComponent } from '../../../../Components/reusable-components/ThreadCardComponents/ThreadRightComponent';
import { orgs, user } from '../../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ThreadRightComponent />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ThreadRightComponent />);
    expect(getByLabelText(/Thread Right/i)).toBeInTheDocument();
  });
});
