import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import NewCommentCard from '../../../../Components/reusable-components/CommentCardComponents/NewCommentCard';
import Context from '../../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { setError, getUserDataRealTime } from '../../../../__mocks__/index';

describe('<NewCommentCard />', () => {
  it('Render NewCommentCard', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{ setError: setError, getUserDataRealTime: getUserDataRealTime }}
      >
        <NewCommentCard />
      </Context.Provider>
    );
    expect(getByLabelText('NewCommentCard')).toBeInTheDocument();
  });
});
