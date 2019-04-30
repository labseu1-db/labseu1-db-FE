import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import UserProfileEndpoint from './Components/Endpoints/UserProfileEndpoint';
import ThreadEndpoint from './Components/Endpoints/ThreadEnpoint';

class App extends Component {
  render() {
    return (
      <SDApp>
        <UserProfileEndpoint />
        <ThreadEndpoint />
      </SDApp>
    );
  }
}

const SDApp = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default App;
