import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CommentDropdown from '../../../../Components/reusable-components/CommentCardComponents/CommentDropdown';
import Context from '../../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { updateDataWithDoc } from '../../../../__mocks__/index';

describe('<CommentDropdown />', () => {
  it('Render CommentDropdown', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <CommentDropdown />
      </Context.Provider>
    );
    expect(getByLabelText('CommentDropdown')).toBeInTheDocument();
  });
});
