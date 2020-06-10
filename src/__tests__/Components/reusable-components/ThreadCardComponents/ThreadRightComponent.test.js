import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadRightComponent from '../../../../Components/reusable-components/ThreadCardComponents/ThreadRightComponent';
import { updateDataWithDoc } from '../../../../__mocks__/index';
import Context from '../../../../Components/ContextProvider/Context';

describe('<ThreadRightComponent />', () => {
  it('Render ThreadRightComponent', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <ThreadRightComponent />
      </Context.Provider>
    );
    expect(getByLabelText('ThreadRightComponent')).toBeInTheDocument();
  });
});
