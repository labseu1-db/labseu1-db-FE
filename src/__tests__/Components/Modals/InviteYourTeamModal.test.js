import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import InviteYourTeamModal from '../../../Components/Modals/InviteYourTeamModal';
import Context from '../../../Components/ContextProvider/Context';
import { render } from '@testing-library/react';
import { isOpen, teamEmailAddress } from '../../../__mocks__/index';

describe('<InviteYourTeamModal />', () => {
  it('Render InviteYourTeamModal', () => {
    const { getByLabelText } = render(
      <Context.Provider>
        <InviteYourTeamModal
          teamEmailAddress={teamEmailAddress}
          shoudlBeOpen={isOpen}
        />
      </Context.Provider>
    );
    expect(getByLabelText('InviteYourTeamModal')).toBeInTheDocument();
  });
});
