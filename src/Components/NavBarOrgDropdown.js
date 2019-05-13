import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export class NavBarOrgDropdown extends Component {
  render() {
    return (
      <span>
        {' '}
        <Dropdown
          inline
          options={this.props.orgOptions}
          defaultValue={this.props.orgOptions[0].value}
          // defaultValue={localStorage.getItem('activeOrg')}
          basic={true}
          onChange={this.props.setSelectedOrgToLocalStorage}
        />
      </span>
    );
  }
}
