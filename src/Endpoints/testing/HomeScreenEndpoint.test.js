import React from 'react';
import {render, cleanup} from 'react-testing-library';
import { HomeScreenEndpoint } from '../HomeScreenEndpoint';

const user = {
    arrayOfOrgs: [
        {isAdmin: true, orgId: 10000, orgName: 'Google'}
    ],
    arrayOfSpaceIds: [
        'dd185a19-3f6b-4907-8ed8-9f6a47cdaed1',
        'c8749d67-d821-483a-b19a-df1f2c5dd549',
        'e460f496-8910-481c-b90e-5cd16566a089',
        'd0afad16-00b0-434c-b461-f1cad54843b1'
    ],
    arrayOfSpaceNames: [
        'Grocery',
        'Garden',
    	'Books',
        'Shoes',
    ],
    fullName: 'Samar Vir',
    profileUrl: 'http://lorempixel.com/640/480',
    userEmail: 'samar@vir.com',
    userId: 200
}

afterEach(cleanup);

describe('homescreen component', () => {
    it('match snapshot', () => {
//         const wrap = render(<HomeScreenEndpoint user={user}/>)
//         expect(wrap.asFragment()).toMatchSnapshot();
    })
})