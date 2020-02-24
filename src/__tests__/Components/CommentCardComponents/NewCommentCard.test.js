import { render } from '@testing-library/react';
import React from 'react';
import { NewCommentCard } from '../../../Components/reusable-components/CommentCardComponents/NewCommentCard';
import '@testing-library/jest-dom/extend-expect';
import { user } from '../../../__mocks__/index';

describe('<NewCommentCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<NewCommentCard profile={user} />);
    expect(getByLabelText(/Comment New/i)).toBeInTheDocument();
  });
});
