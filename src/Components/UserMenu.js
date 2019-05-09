import React from 'react';

class UserMenu extends React.Component {
  state = {
    displayMenu: true
  };

  showDropdownMenu(e) {
    e.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    if (this.state.displayMenu === false) {
      return null;
    }
    return <div>this is the user menu</div>;
  }
}

export default UserMenu;
