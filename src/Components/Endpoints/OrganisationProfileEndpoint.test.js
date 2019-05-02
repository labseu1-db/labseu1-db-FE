import React from 'react';
import * as rtl from 'react-testing-library';
import {OrganisationProfileEndpoint} from './OrganisationProfileEndpoint';

const org = {
    arrayOfAdmins:  [
        {userEmail: 'bender.thorben0@gmail.com', userId: 20}
    ],
    arrayOfUsers: [
        {userEmail: 'samar@vir.com', userId: 1000}
    ],
    createdByUserId: 20,
    isPremium: false,
    orgId: 20,
    orgMission: 'Do stuff',
    orgName: 'No Clue',
    orgUrl: 'https://noClue.com'
}

describe('Organisationendpoint component', () => {
    it('match snapshot', () => {
        const wrap = rtl.render(<OrganisationProfileEndpoint organisation={org} />);
        expect(wrap.asFragment()).toMatchSnapshot();
    })
})