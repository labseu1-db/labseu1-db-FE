import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CommentCard from '../../../../Components/reusable-components/CommentCardComponents/CommentCard';
import Context from '../../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import {
  updateDataWithDoc,
  arrayOfUsersWhoLiked
} from '../../../../__mocks__/index';

describe('<CommentCard />', () => {
  it('Render CommentCard', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <CommentCard arrayOfUsersWhoLiked={arrayOfUsersWhoLiked} />
      </Context.Provider>
    );
    expect(getByLabelText('CommentCard')).toBeInTheDocument();
  });
});
