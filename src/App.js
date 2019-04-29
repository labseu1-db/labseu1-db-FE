import React, { Component } from 'react';

import AddCompany from './Components/AddCompany';
import CompanyList from './Components/CompanyList';

class App extends Component {
  render() {
    return (
      <div>
        <AddCompany />
        <CompanyList />
      </div>
    );
  }
}

export default App;
