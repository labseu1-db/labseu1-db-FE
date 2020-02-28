import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from './semantic-components/Spinner';

export class UserSideBar extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async () => {
    let dataref = this.props.firestore
      .collection('users')
      .doc(this.props.userForSideBar);
    let doc = await dataref.get();
    this.setState({ user: doc.data() });
  };
  render() {
    if (this.state.user === null) {
      return <Spinner />;
    } else {
      return (
        <StyledUserSideBar>
          <p>{this.state.user.fullName}</p>
        </StyledUserSideBar>
      );
    }
  }
}

//Connect to Firestore
export default UserSideBar;

const StyledUserSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #fff7f3;
  color: #3d4856;
  height: 100vh;
  width: 30%;
  padding-right: 5%;
  background-color: #fff7f3;
`;
