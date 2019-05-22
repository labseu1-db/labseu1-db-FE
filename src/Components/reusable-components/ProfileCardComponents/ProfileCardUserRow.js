import React from 'react';
import styled from 'styled-components';
import ProfileCardButton from './ProfileCardButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

class ProfileCardUserRow extends React.Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      fullName: this.props.user.fullName
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }
  onChangeHandler = e => {
    this.setState({ fullName: e.target.value });
  };
  onSubmitHandler = event => {
    if (event.which === 13 || event.keyCode === 13) {
      event.preventDefault();
      let ref = this.props.firestore.collection('users').doc(this.props.uuid);
      ref
        .update({
          fullName: this.state.fullName
        })
        .then(() => {
          this.props.editingProfileDone();
        });
    }
  };

  escFunction = event => {
    if (this.props.editingProfileStatus && event.which === 27) {
      this.props.editingProfileDone();
    } else {
      this.onChangeHandler(event);
    }
  };
  render() {
    const { onClick, secondOnClick } = this.props;
    return (
      <StyledFirstRow>
        <img src={this.props.user.profileUrl} alt="user" />
        {!this.props.editingProfileStatus && <StyledNameSpan>{this.props.user.fullName}</StyledNameSpan>}
        {this.props.editingProfileStatus && (
          <StyledNameSubmitForm
            onKeyPress={event => {
              this.onSubmitHandler(event);
            }}>
            <StyledNameInput value={this.state.fullName} onChange={this.onChangeHandler} />
            <StyledCancel>Press Enter to Submit{'\n'} and Escape to cancel</StyledCancel>
          </StyledNameSubmitForm>
        )}
        <ProfileCardButton
          content="Change Password"
          border="solid 0.5px #37475026"
          top="0px"
          right="0px"
          margin="6.5vw"
          onClick={onClick}
        />
        <ProfileCardButton
          content="Edit Profile"
          border="solid 0.5px #37475026"
          top="0px"
          right="0px"
          onClick={secondOnClick}
        />
      </StyledFirstRow>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileCardUserRow);

const StyledCancel = styled.span`
  font-size: 11px;
  white-space: pre;
  font-weight: 300;
  color: rgb(125, 135, 141);
`;

const StyledNameInput = styled.input`
  font-size: 2.4rem;
  max-width: 14vw;
  border: none;
  font-weight: 300;
  border-bottom: 2px solid #3d4856;
  padding-bottom: 3px;
  @media screen and (max-width: 1500px) {
    width: 12vw;
  }
  &:focus {
    border-bottom: 2px solid #00bc98;
    outline: none;
  }
  color: rgb(55, 71, 80);
`;

const StyledNameSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
`;

const StyledFirstRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  img {
    width: 95px;
    height: 95px;
    border-radius: 300px;
    margin-top: 14px;
    margin-left: 20px;
    margin-right: 40px;
  }
`;

const StyledNameSpan = styled.span`
  width: 400px;
  font-size: 32px;
  font-weight: 300;
  color: rgb(55, 71, 80);
  padding-top: 10px;
  overflow-wrap: break-word;
  margin-top: 40px;
`;
