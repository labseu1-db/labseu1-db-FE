import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import SidebarEndpoint from './Endpoints/SidebarEndpoint';
import HomeScreenEndpoint from './Endpoints/HomeScreenEndpoint';
import UserProfileEndpoint from './Endpoints/UserProfileEndpoint';
import OrganisationProfileEndpoint from './Endpoints/OrganisationProfileEndpoint';
import SpaceEndpoint from './Endpoints/SpaceEndpoint';
import ThreadEndpoint from './Endpoints/ThreadEndpoint';
import CommentEndpoint from './Endpoints/CommentEndpoint';

class App extends Component {
  render() {
    return (
      <SDApp>
        <SidebarEndpoint />
        <UserProfileEndpoint />
        <OrganisationProfileEndpoint />
        <SpaceEndpoint />
        <ThreadEndpoint />
        <CommentEndpoint />
        <HomeScreenEndpoint />
      </SDApp>
    );
  }
}

const SDApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

export default App;
