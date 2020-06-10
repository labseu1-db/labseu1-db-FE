import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UpdateComment from '../../../../Components/reusable-components/CommentCardComponents/UpdateComment';
import Context from '../../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { updateDataWithDoc, comment } from '../../../../__mocks__/index';

describe('<UpdateComment />', () => {
  it('Render UpdateComment', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <UpdateComment content={comment.content} />
      </Context.Provider>
    );
    expect(getByLabelText('UpdateComment')).toBeInTheDocument();
  });
});
