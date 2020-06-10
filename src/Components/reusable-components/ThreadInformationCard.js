import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

//Import components
import AvatarFromLetter from '../reusable-components/AvatarFromLetter';

// import Context API
import Context from '../ContextProvider/Context';

//Main component
export function ThreadInformationCard(props) {
  // use Context API
  const { getSpaceWithId } = useContext(Context);

  const [space, setSpace] = useState('');

  useEffect(() => {
    let getSpaceUnsubscribe = getSpaceWithId(setSpace, props.spaceId);
    return () => getSpaceUnsubscribe();
  }, [getSpaceWithId, props.spaceId]);

  const { createdBy, createdAt, info } = props;
  let dateInfo = new Date(createdAt);
  let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${(
    '0' + dateInfo.getMinutes()
  ).slice(-2)}`;
  return (
    <StyledThreadContainer aria-label="ThreadInformationCard">
      <StyledTopContent>
        <AvatarFromLetter username={createdBy} marginBottom="8px" />
        <StyledRightSideOfContainer>
          <StyledAuthorContainer>{createdBy}</StyledAuthorContainer>
          <StyledThreadInformation>
            started this thread in{' '}
            <span className="space">{space.spaceName}</span> ·{' '}
            <span>{date}</span>
          </StyledThreadInformation>
        </StyledRightSideOfContainer>
      </StyledTopContent>
      <StyledBottomContent>{info}</StyledBottomContent>
    </StyledThreadContainer>
  );
}

//Styling
const StyledThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 24px 0px;
`;

const StyledTopContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledRightSideOfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
  font-weight: 300;
`;
const StyledAuthorContainer = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
`;

const StyledThreadInformation = styled.div`
  color: #879195;
  line-height: 2;
  font-size: 0.9rem;
  .space {
    color: #3d4856;
    font-weight: 600;
  }
`;
const StyledBottomContent = styled.div`
  margin-top: 40px;
  line-height: 1.75;
`;

export default ThreadInformationCard;
