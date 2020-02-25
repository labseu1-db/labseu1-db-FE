import { render } from '@testing-library/react';
import React from 'react';
import { CommentCard } from '../../../../Components/reusable-components/CommentCardComponents/CommentCard';
import '@testing-library/jest-dom/extend-expect';
import { arrayOfUsersWhoLiked } from '../../../../__mocks__/index';

describe('<CommentCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <CommentCard arrayOfUsersWhoLiked={arrayOfUsersWhoLiked} />
    );
    expect(getByLabelText(/Comment Card/i)).toBeInTheDocument();
  });
});