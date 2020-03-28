import React, { useState, useContext } from 'react';
import uuid from 'uuid';

import { StyledButton } from './styled-components/StyledButton';
import {
  StyledLogin,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLoginCon,
  StyledLowerSignIn,
  StyledIcon
} from './styled-components/StyledLogin';
import {
  StyledH1,
  StyledLink,
  StyledPLabel
} from './styled-components/StyledText';
import LoginAnimation from './animations/LoginAnimation';

//Images/Icons
import showPassword from '../images/icon-eye-gray.svg';
import hidePassword from '../images/icon-eye-green.svg';

// Context
import Context from './ContextProvider/Context';

const Register = props => {
  // Context Api
  const { setError, firebase, saveData } = useContext(Context);

  // Hooks
  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'loginEmail':
        setEmail(e.target.value);
        break;
      case 'loginPassword':
        setPassword(e.target.value);
        break;
      case 'fullName':
        setFullName(e.target.value);
        break;
      default:
        break;
    }
  };

  // const saveUserToDatabaseAndToLocalStorageWhenUsingGoogleSignIn = res => {
  //   let userId = uuid();
  //   props.firestore
  //     .collection('users')
  //     .doc(userId)
  //     .set({
  //       fullName: res.profile.displayName,
  //       userEmail: res.profile.email,
  //       profileUrl: res.profile.avatarUrl,
  //       arrayOfOrgsNames: [],
  //       arrayOfOrgsIds: [],
  //       arrayOfSpaceIds: [],
  //       arrayOfSpaceNames: []
  //     })
  //     .then(() => {
  //       localStorage.setItem('uuid', userId);
  //       localStorage.setItem('userEmail', res.profile.email);
  //     })
  //     .catch(function(error) {
  //       console.log('Error getting documents: ', error);
  //       setError(error);
  //     });
  // };

  const saveUserToDatabaseAndToLocalStorage = res => {
    let userId = uuid();

    props.firestore
      .collection('users')
      .doc(userId)
      .set({
        fullName: fullName,
        userEmail: res.user.user.email,
        profileUrl: 'http://lorempixel.com/640/480',
        arrayOfOrgsNames: [],
        arrayOfOrgsIds: [],
        arrayOfSpaceIds: [],
        arrayOfSpaceNames: []
      })
      .then(() => {
        localStorage.setItem('uuid', userId);
        localStorage.setItem('userEmail', loginEmail);
      })
      .then(res => {
        const orgRef = props.firestore
          .collection('organisations')
          .where('arrayOfUsersEmails', 'array-contains', loginEmail);
        orgRef
          .get()
          .then(qs => {
            qs.forEach(doc => {
              saveUserIdInOrg(doc.id, userId);
              saveOrgNameAndOrgIdInUser(doc.id, doc.data().orgName, userId);

              localStorage.setItem('activeOrg', doc.id);
            });
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error);
          });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
        setError(error);
      });
  };

  const createAndLogInNewUser = async e => {
    try {
      e.preventDefault();
      await firebase.createUser(
        { loginEmail, loginPassword },
        { fullName, loginEmail }
      );
      let data = await firebase.login({ loginEmail, loginPassword });
      let { user } = data;
      const userId = uuid();
      let request = {
        collection: 'users',
        docId: userId,
        type: 'save_id_local',
        data: {
          fullName: fullName,
          userEmail: user.email,
          profileUrl: 'http://lorempixel.com/640/480',
          arrayOfOrgsNames: [],
          arrayOfOrgsIds: [],
          arrayOfSpaceIds: [],
          arrayOfSpaceNames: []
        }
      };
      saveData(request);
      // .then(() => {
      //   props.history.push('/createneworganisation');
      // });
    } catch (error) {
      setError(error);
    }
  };

  const saveOrgNameAndOrgIdInUser = (orgId, orgName, userId) => {
    props.firestore
      .collection('users')
      .doc(userId)
      .update({
        arrayOfOrgsNames: props.firestore.FieldValue.arrayUnion(orgName),
        arrayOfOrgsIds: props.firestore.FieldValue.arrayUnion(orgId)
      })
      .catch(err => console.log(err));
  };

  const saveUserIdInOrg = (orgId, userId) => {
    props.firestore
      .collection('organisations')
      .doc(orgId)
      .update({
        arrayOfUsersIds: props.firestore.FieldValue.arrayUnion(userId)
      })
      .catch(err => console.log(err));
  };

  const togglePassword = () => {
    let temp = document.getElementById('typepass');
    let passwordIcon = document.getElementById('passwordIcon');
    if (temp.type === 'password') {
      temp.type = 'text';
      passwordIcon.src = hidePassword;
      passwordIcon.alt = 'hidePassword';
    } else {
      temp.type = 'password';
      passwordIcon.src = showPassword;
      passwordIcon.alt = 'showPassword';
    }
  };

  const isInvalid =
    loginEmail === '' || loginPassword === '' || fullName === '';
  return (
    <StyledLogin>
      <StyledLoginCon>
        <StyledH1>Register</StyledH1>
        <StyledForm onSubmit={createAndLogInNewUser}>
          <StyledLabel>
            <StyledPLabel>Full Name</StyledPLabel>
            <StyledInput
              name="fullName"
              value={fullName}
              type="text"
              onChange={handleInputChange}
              placeholder="Tony Stark"
            />
          </StyledLabel>
          <StyledLabel>
            <StyledPLabel>Email</StyledPLabel>
            <StyledInput
              name="loginEmail"
              value={loginEmail}
              type="email"
              onChange={handleInputChange}
              placeholder="tonystark@example.com"
            />
          </StyledLabel>
          <StyledLabel>
            <StyledPLabel>Password</StyledPLabel>
            <StyledInput
              id="typepass"
              name="loginPassword"
              value={loginPassword}
              type="password"
              onChange={handleInputChange}
              placeholder="········"
            />
            <StyledIcon
              id="passwordIcon"
              src={showPassword}
              alt="showPassword"
              onClick={togglePassword}
            />
          </StyledLabel>

          <StyledLowerSignIn>
            <StyledLink to="/login"> Already have an account? </StyledLink>
            <StyledButton disabled={isInvalid} onClick={createAndLogInNewUser}>
              Register
            </StyledButton>
          </StyledLowerSignIn>
        </StyledForm>
        {/* <Button
            color='google plus'
            onClick={() => {
              props.firebase
                .login({ provider: 'google', type: 'popup' })
                .then(res => {
                  saveUserToDatabaseAndToLocalStorageWhenUsingGoogleSignIn(res);
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            <Icon name='google plus' /> Sign in with Google
          </Button> */}
      </StyledLoginCon>
      <LoginAnimation />
    </StyledLogin>
  );
};

export default Register;
