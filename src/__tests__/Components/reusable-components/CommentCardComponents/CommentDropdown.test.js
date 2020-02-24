import { render } from '@testing-library/react';
import React from 'react';
import { CommentDropdown } from '../../../../Components/reusable-components/CommentCardComponents/CommentDropdown';
import '@testing-library/jest-dom/extend-expect';

describe('CommentDropdown />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<CommentDropdown />);
    expect(getByLabelText(/Comment Drop/i)).toBeInTheDocument();
  });
});
