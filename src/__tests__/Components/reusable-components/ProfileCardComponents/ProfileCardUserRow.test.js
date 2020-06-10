import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ProfileCardUserRow from '../../../../Components/reusable-components/ProfileCardComponents/ProfileCardUserRow';
import { render } from '@testing-library/react';
import Context from '../../../../Components/ContextProvider/Context';
import {
  updateDataWithDoc,
  getUserDataRealTime
} from '../../../../__mocks__/index';
import { getByLabelText } from 'react-testing-library';

describe('<ProfileCardUserRow />', () => {
  it('Render ProfileCardUserRow', () => {
    const { getByLabelText } = render(
      <Context.Provider
        value={{
          updateDataWithDoc: updateDataWithDoc,
          getUserDataRealTime: getUserDataRealTime
        }}
      >
        <ProfileCardUserRow />
      </Context.Provider>
    );
    expect(getByLabelText('ProfileCardUserRow')).toBeInTheDocument();
  });
});
