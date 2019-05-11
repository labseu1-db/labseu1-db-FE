import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export class NavBarOrgDropdown extends Component {
  componentDidMount() {
    this.props.setActiveOrg(this.props.orgOptions[0].value);
  }

  render() {
    return (
      <span>
        {' '}
        <Dropdown
          inline
          options={this.props.orgOptions}
          defaultValue={this.props.orgOptions[0].value}
          basic={true}
          onChange={this.props.setSelectedOrgToRedux}
        />
      </span>
    );
  }
}
