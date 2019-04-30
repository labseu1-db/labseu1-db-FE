import React from 'react';
import * as rtl from 'react-testing-library';

import CommentEndpointWithStore, { CommentEndpoint } from './CommentEndpoint';

const comment = {
  commentBody: 'Apple',
  commentCreatedAt: { seconds: 12345678 },
  commentCreatedByUserName: 'Test Username',
  arrayOfUserIdsWhoLiked: [1, 3, 5],
  isCommentDecided: true
};

afterEach(rtl.cleanup);

describe('Comment Endpoint', () => {
  it('renders heading', () => {
    const wrap = rtl.render(<CommentEndpoint comment={comment} />);
    expect(wrap.getByText(/comment endpoint/i));
  });
  it('renders comment body', () => {
    const wrap = rtl.render(<CommentEndpoint comment={comment} />);
    expect(wrap.getByText(/apple/i));
  });
});
