import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import UserProfileEndpoint from './Components/Endpoints/UserProfileEndpoint';
import SpaceEndpoint from './Components/Endpoints/SpaceEndpoint';
import ThreadEndpoint from './Components/Endpoints/ThreadEndpoint';
import CommentEndpoint from './Components/Endpoints/CommentEndpoint';

class App extends Component {
  render() {
    return (
      <SDApp>
        <UserProfileEndpoint />
        <SpaceEndpoint />
        <ThreadEndpoint />
        <CommentEndpoint />
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
