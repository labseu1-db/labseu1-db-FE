import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import LeaveSpaceModal from '../../../Components/Modals/LeaveSpaceModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { updateDataWithDoc, space, isOpen } from '../../../__mocks__/index';

describe('<LeaveSpaceModal />', () => {
  it('Render LeaveSpaceModal', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <LeaveSpaceModal space={space} shoudlBeOpen={isOpen} />
      </Context.Provider>
    );
    expect(getByLabelText('LeaveSpaceModal')).toBeInTheDocument();
  });
});
