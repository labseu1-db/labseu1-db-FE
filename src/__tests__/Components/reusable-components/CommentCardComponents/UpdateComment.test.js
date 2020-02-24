import { render } from '@testing-library/react';
import React from 'react';
import { UpdateComment } from '../../../../Components/reusable-components/CommentCardComponents/UpdateComment';
import '@testing-library/jest-dom/extend-expect';
import { text } from '../../../../__mocks__/index';

describe('<UpdateComment />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<UpdateComment content={text} />);
    expect(getByLabelText(/Comment Update/i)).toBeInTheDocument();
  });
});
