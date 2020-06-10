import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadCard from '../../../Components/reusable-components/ThreadCard';
import { info, updateDataWithDoc } from '../../../__mocks__/index';
import Context from '../../../Components/ContextProvider/Context';

describe('<ThreadCard />', () => {
  it('Render ThreadCard', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <ThreadCard info={info} />
      </Context.Provider>
    );
    expect(getByLabelText('ThreadCard')).toBeInTheDocument();
  });
});
