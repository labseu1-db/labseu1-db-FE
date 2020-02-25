import { render } from '@testing-library/react';
import React from 'react';
import RightSidebar from '../../Components/RightSidebar';
import '@testing-library/jest-dom/extend-expect';
import { showModal } from '../../__mocks__/index';

describe('<RightSidebar />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<RightSidebar showModal={showModal} />);
    expect(getByLabelText(/Right Sidebar/i)).toBeInTheDocument();
  });
});
