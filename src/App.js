import React, { Component } from 'react';

import AddCompany from './Components/AddCompany';
import CompanyList from './Components/CompanyList';
import HomeScreenEndpoint from './Components/EndpointComponents/HomeScreenComponent';
import CommentEndpoint from './Components/EndpointComponents/CommentEndpoint';
import OrganisationProfileEndpoint from './Components/EndpointComponents/OrganisationProfileEndpoint';

class App extends Component {
  render() {
    return (
      <div>
        <OrganisationProfileEndpoint />
        {/* <AddCompany />
        <CompanyList /> */}
      </div>
    );
  }
}

export default App;
