import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import AddCompany from './Components/AddCompany';
import CompanyList from './Components/CompanyList';

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
