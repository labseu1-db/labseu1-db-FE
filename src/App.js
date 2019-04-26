import React, { Component } from 'react';

import AddCompany from './Components/AddCompany';
import CompanyList from './Components/CompanyList';

import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AddCompany />
          <CompanyList />
        </div>
      </Provider>
    );
  }
}

export default App;
