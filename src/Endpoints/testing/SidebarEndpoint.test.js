import React from 'react';
import * as rtl from 'react-testing-library';

import { SidebarEndpoint } from '../SidebarEndpoint';

const sidebar = {
  arrayOfOrgs: [
    {
      isAdmin: true,
      orgId: 1,
      orgName: 'Google'
    }],
  arrayOfSpaceIds:
    [
      'dd185a19-3f6b-4907-8ed8-9f6a47cdaed1',
      'c8749d67-d821-483a-b19a-df1f2c5dd549'
    ],
  arraOfSpacesNames: [
    'BudgetForInterns',
    'HireUXDesiners',
    , 'GetTogetherForBob'
  ]
}
afterEach(rtl.cleanup);

describe('Sidebar Endpoint', () => {
  it('match snapshot', () => {
    const wrap = rtl.render(<SidebarEndpoint user={sidebar} />)
    expect(wrap.asFragment()).toMatchSnapshot();
  })
})
