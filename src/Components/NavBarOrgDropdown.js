import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export class NavBarOrgDropdown extends Component {
  // handleInput = e => {
  //   if (e.value === localStorage.getItem('activeOrg')) {
  //     this.props.setSelectedOrgToLocalStorage(e);
  //   }
  // };
  render() {
    return (
      <div>
        {' '}
        <Dropdown
          inline
          options={this.props.orgOptions}
          defaultValue={this.props.activeOrg}
          basic={true}
          onChange={this.props.setSelectedOrgToLocalStorage}
        />
      </div>
    );
  }
}
