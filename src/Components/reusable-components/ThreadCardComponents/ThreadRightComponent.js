import React, { useContext } from 'react';
import styled from 'styled-components';

//Import icons
import clipboardIcon from '../../../images/icon-clipboard-green.svg';

// import Context API
import Context from '../../ContextProvider/Context';

//Main component
export const ThreadRightComponent = props => {
  // use Context API
  const { updateDataWithDoc, firebase } = useContext(Context);

  const markAsFollowUp = e => {
    e.stopPropagation();
    if (props.isFollowUpDecided) {
      let request = {
        collection: 'threads',
        docId: props.threadId,
        data: {
          arrayOfUserIdsWhoFollowUp: firebase.firestore.FieldValue.arrayRemove(
            localStorage.getItem('uuid')
          )
        }
      };
      updateDataWithDoc(request);
    } else {
      let request = {
        collection: 'threads',
        docId: props.threadId,
        data: {
          arrayOfUserIdsWhoFollowUp: props.firestore.FieldValue.arrayUnion(
            localStorage.getItem('uuid')
          )
        }
      };
      updateDataWithDoc(request);
    }
  };

  return (
    <div>
      {!props.isFollowUpDecided && (
        <StyledRightContainer onClick={e => markAsFollowUp(e)}>
          <StyledFollowUpButton>Follow Up</StyledFollowUpButton>
        </StyledRightContainer>
      )}
      {props.isFollowUpDecided && (
        <StyledDecision onClick={e => markAsFollowUp(e)}>
          <img src={clipboardIcon} alt="home icon" />
          Following
        </StyledDecision>
      )}
    </div>
  );
};

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

const StyledFollowUpButton = styled.button`
  background-color: white;
  color: #bdc3c9;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border: none;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  &:hover {
    /* border: 1px solid #00bc98; */
    font-weight: 600;
    cursor: pointer;
  }
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
`;

const StyledDecision = styled.button`
  background-color: white;
  color: #00bc98;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border: none;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
  &:hover {
    /* border: 1px solid #00bc98b3; */
    font-weight: 600;
    cursor: pointer;
  }
`;

export default ThreadRightComponent;
