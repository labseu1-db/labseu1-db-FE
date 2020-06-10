import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import DeleteSpaceModal from '../../../Components/Modals/DeleteSpaceModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { updateDataWithDoc, space, isOpen } from '../../../__mocks__/index';

describe('<DeleteSpaceModal />', () => {
  it('Render DeleteSpaceModal', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ updateDataWithDoc: updateDataWithDoc }}>
        <DeleteSpaceModal space={space} shoudlBeOpen={isOpen} />
      </Context.Provider>
    );
    expect(getByLabelText('DeleteSpaceModal')).toBeInTheDocument();
  });
});
