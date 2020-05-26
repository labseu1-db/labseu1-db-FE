import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

export class NavBarOrgDropdown extends Component {
  // handleInput = e => {
  //   if (e.value === localStorage.getItem('activeOrg')) {
  //     this.props.setSelectedOrgToLocalStorage(e);
  //   }
  // };
  render() {
    return (
      <StyledDropdown aria-label="NavBarOrgDropdown">
        {' '}
        <Dropdown
          inline
          options={this.props.orgOptions}
          defaultValue={this.props.activeOrg}
          basic={true}
          onChange={this.props.setSelectedOrgToLocalStorage}
        />
      </StyledDropdown>
    );
  }
}

const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }

  .item {
    margin: 5px;
    border-radius: 5px;
  }
`;
