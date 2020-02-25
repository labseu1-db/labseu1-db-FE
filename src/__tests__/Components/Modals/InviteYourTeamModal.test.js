import { render } from '@testing-library/react';
import React from 'react';
import InviteYourTeamModal from '../../../Components/Modals/InviteYourTeamModal';
import '@testing-library/jest-dom/extend-expect';
import { shoudlBeOpen, teamEmailAddress } from '../../../__mocks__/index';

describe('<InviteYourTeamModal />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <InviteYourTeamModal
        shoudlBeOpen={shoudlBeOpen}
        teamEmailAddress={teamEmailAddress}
      />
    );
    expect(getByLabelText(/Invite Team Modal/i)).toBeInTheDocument();
  });
});
