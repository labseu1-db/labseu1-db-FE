import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import icons
import messageIconDarkgray from '../../../images/icon-message-darkgray.svg';

//Main component
function ThreadRightComponent(props) {
  return (
    <StyledRightContainer>
      <div className="row-with-image">
        <img src={messageIconDarkgray} alt="message icon" />
        {/* <div>{props.comments.length}</div> */}
      </div>
    </StyledRightContainer>
  );
}

//Styling
const StyledRightContainer = styled.div`
  width: 5%;
  height: 100%;
  .row-with-image {
    display: flex;
    align-items: center;

    font-size: 0.9rem;
    img {
      padding-top: 2px;
      width: 40%;
      margin-right: 5px;
    }
  }
`;

//Default export
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
    // comments: state.firestore.ordered.comments ? state.firestore.ordered.comments : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
  //   props => {
  //   return [
  //     {
  //       collection: 'comments',
  //       where: [['threadId', '==', props.threadId]]
  //     }
  //   ];
  // }
)(ThreadRightComponent);
