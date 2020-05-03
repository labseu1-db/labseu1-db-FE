import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCardButton from './ProfileCardButton';

// import Context API
import Context from '../../ContextProvider/Context';

export const ProfileCardUserRow = props => {
  // constructor(props) {
  //   super(props);
  //   escFunction = escFunction.bind(this);
  //   state = {
  //     fullName: props.user.fullName
  //   };
  // }
  // componentDidMount() {
  //   document.addEventListener('keydown', escFunction, false);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener('keydown', escFunction, false);
  // }

  const {
    updateDataWithDoc,
    getUserDataRealTime,
    setResetPasswordStatus
  } = useContext(Context);

  const escFunction = event => {
    if (editingProfileStatus && event.which === 27) {
      setEditingProfileStatus(false);
    } else {
      onChangeHandler(event);
    }
  };
  const [user, setUser] = useState('');
  const [fullName, setFullName] = useState(user.fullName);
  const [editingProfileStatus, setEditingProfileStatus] = useState(false);

  useEffect(() => {
    getUserDataRealTime(setUser);
  }, [getUserDataRealTime]);

  const onChangeHandler = e => {
    setFullName(e.target.value);
  };

  const editProfile = () => {
    setFullName(user.fullName);
    setEditingProfileStatus(true);
  };
  const onSubmitHandler = event => {
    if (event.which === 13 || event.keyCode === 13) {
      event.preventDefault();
      let request = {
        collection: 'users',
        docId: props.uuid,
        data: {
          fullName: fullName
        }
      };
      updateDataWithDoc(request).then(setEditingProfileStatus(false));
    }
  };

  return (
    <StyledFirstRow onKeyDown={escFunction}>
      {/* <StyledImg src={props.user.profileUrl} alt='user' /> */}
      {!editingProfileStatus && (
        <StyledNameSpan aria-label="full name">{user.fullName}</StyledNameSpan>
      )}
      {editingProfileStatus && (
        <StyledNameSubmitForm
          onKeyPress={event => {
            onSubmitHandler(event);
          }}
        >
          <StyledNameInput value={fullName} onChange={onChangeHandler} />
          <StyledCancel>
            Press Enter to Submit{'\n'} and Escape to cancel
          </StyledCancel>
        </StyledNameSubmitForm>
      )}
      <ProfileCardButton
        content="Change Password"
        border="solid 0.5px #37475026"
        top="0px"
        right="0px"
        margin="6.5vw"
        onClick={() => setResetPasswordStatus(true)}
      />
      <ProfileCardButton
        content="Edit Profile"
        border="solid 0.5px #37475026"
        top="0px"
        right="0px"
        onClick={editProfile}
      />
    </StyledFirstRow>
  );
};

export default ProfileCardUserRow;

const StyledCancel = styled.span`
  font-size: 11px;
  white-space: pre;
  font-weight: 300;
  color: rgb(125, 135, 141);
`;

// const StyledImg = styled.img`
//   margin-bottom: 1%;
// `;
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
  position: absolute;
  left: 2%;
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
  position: absolute;
  left: 2%;
`;
