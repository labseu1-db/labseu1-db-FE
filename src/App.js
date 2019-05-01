import React, { Component } from 'react';
import styled from 'styled-components';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
import LoginAnimation from './Components/animations/LoginAnimation';

class App extends Component {
  render() {
    return (
      <SDApp>
        <LoginAnimation />
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
