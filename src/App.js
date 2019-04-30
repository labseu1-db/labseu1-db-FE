import React, { Component } from 'react';

// import AddCompany from './Components/AddCompany';
// import CompanyList from './Components/CompanyList';
// import HomeScreenEndpoint from './Components/EndpointComponents/HomeScreenComponent';
// import CommentEndpoint from './Components/EndpointComponents/CommentEndpoint';
import UserProfileEndpoint from './Components/Endpoints/UserProfileEndpoint';

class App extends Component {
  render() {
    return (
      <div>
        <UserProfileEndpoint />
      </div>
    );
  }
}

export default App;
