import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import CheckoutFormContainer from './CheckoutFormContainer';
import Navbar from './NavBar';
import RightSidebar from './RightSidebar';

// import Context API
import Context from './ContextProvider/Context';

//Main component
const UpgradeAccount = props => {
  const { getOrgWithId } = useContext(Context);

  const [org, setOrg] = useState('');

  useEffect(() => {
    let getOrgUnsubscribe = getOrgWithId(setOrg, props.match.params.id);
    return () => getOrgUnsubscribe();
  }, [getOrgWithId, props.match.params.id]);

  if (org.isPremium) {
    return (
      <StyledMain>
        <Navbar {...props} />
        <StyledMainScreen>
          <StyledFirstRow>
            {props.match.params.id && org && (
              <ScreenHeading
                heading={org.orgName}
                info="Organization billing overview"
              />
            )}
          </StyledFirstRow>
          <StyledThreadContainerPremium>
            <ScreenSectionHeading heading="This organisation is on the PREMIUM plan" />
            <div>
              We hope you are enjoying the full benefits of your premium plan.
              Please contact customer service for any further special
              requirements.
            </div>
          </StyledThreadContainerPremium>
        </StyledMainScreen>
        <RightSidebar />
      </StyledMain>
    );
  }
  return (
    <StyledMain>
      <Navbar {...props} />
      <StyledMainScreen>
        <StyledFirstRow>
          {props.match.params.id && org && (
            <ScreenHeading
              heading={org.orgName}
              info="Organization billing overview"
            />
          )}
        </StyledFirstRow>
        <StyledThreadContainer>
          <ScreenSectionHeading heading="Currently on the FREE plan" />
          <ul>
            <li>Store more than the most recent 150 threads</li>
            <li>Invite more employees to your organisation</li>
            <li>used 0GB of space -- 5.00GB remaining</li>
          </ul>
          <CheckoutFormContainer currentOrg={org} />
        </StyledThreadContainer>
      </StyledMainScreen>
      <RightSidebar />
    </StyledMain>
  );
};

export default UpgradeAccount;

//Styling
const StyledMain = styled.div`
  display: flex;
  width: 100vw;
`;

const StyledMainScreen = styled.div`
  background-color: #fff7f3;
  min-height: 100vh;
  width: 70%;
  padding: 10vh 5%;
  margin-left: 309px;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;

const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 215px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
`;

const StyledThreadContainerPremium = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 120px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
`;
