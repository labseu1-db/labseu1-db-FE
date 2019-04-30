import React, { Component } from 'react';

import AddCompany from './Components/AddCompany';
import CompanyList from './Components/CompanyList';
import AuthButton from './Components/AuthButton';

class App extends Component {
  render() {
    return (
      <div>
        <AuthButton />
        <AddCompany />
        <CompanyList />
      </div>
    );
  }
}

export default App;
