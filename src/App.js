import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import SidebarEndpoint from './Components/Endpoints/SidebarEndpoint';
import HomeScreenEndpoint from './Components/Endpoints/HomeScreenEndpoint';
import UserProfileEndpoint from './Components/Endpoints/UserProfileEndpoint';
import OrganisationProfileEndpoint from './Components/Endpoints/OrganisationProfileEndpoint';
import SpaceEndpoint from './Components/Endpoints/SpaceEndpoint';
import ThreadEndpoint from './Components/Endpoints/ThreadEndpoint';
import CommentEndpoint from './Components/Endpoints/CommentEndpoint';

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
