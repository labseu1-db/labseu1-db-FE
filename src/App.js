import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import UserProfileEndpoint from './Components/Endpoints/UserProfileEndpoint';
import ThreadEndpoint from './Components/Endpoints/ThreadEnpoint';
import SpaceEndpoint from './Components/Endpoints/SpaceEndpoint';

class App extends Component {
  render() {
    return (
      <SDApp>
        <UserProfileEndpoint />
        <ThreadEndpoint />
        <SpaceEndpoint />
      </SDApp>
    );
  }
}

const SDApp = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export default App;
