import React, { useContext } from 'react';

//Import dependencies
import styled from 'styled-components';
import uuid from 'uuid';

//Import semantic components
import { Modal } from 'semantic-ui-react';

//Import components
import ProgressBar from '../reusable-components/ProgressBar';

// import Context API
import Context from '../ContextProvider/Context';

//Default export
const CreateSpacesModal = props => {
  // use Context API
  const { redirect } = useContext(Context);

  const spacesExamples = [
    { name: 'Product', color: 'eggplant' },
    { name: 'Engineering', color: 'darkgreen' },
    { name: 'Recruiting', color: 'violet' },
    { name: 'Design', color: 'darkolive' },
    { name: 'Marketing', color: 'yellow' },
    { name: 'Reviews', color: 'red' },
    { name: 'Announcements', color: 'lightblue' },
    { name: 'Research', color: 'green' }
  ];

  //Render component
  return (
    <Modal open={props.shoudlBeOpen} basic size="tiny">
      <ProgressBar activeDots={3} bulletpoints={3} />
      <StyledModalH1 aria-label="CreateSpacesModal">
        <Modal.Header content="Create few spaces" />
      </StyledModalH1>
      <StyledModalCard>
        <Modal.Content>
          <StyledModalForm>
            <StyledModalLabel>Set up spaces for your team</StyledModalLabel>
            <StyledModalTextInForm>
              Spaces are your team's virtual meeting rooms. Use them to have
              discussions about specific projects and broader team topics.
            </StyledModalTextInForm>
            <StyledModalLabel>
              Choose a few spaces{' '}
              <span>{`${props.createdSpaces.length} selected`}</span>
            </StyledModalLabel>
            <StyledModalSpacesContainer>
              {spacesExamples.map(s => {
                return (
                  <StyledSpacesModalCard
                    className={`${props.createdSpaces.indexOf(s.name) > -1 &&
                      'borderclass'} ${s.color}`}
                    key={s.name}
                    onClick={() => {
                      props.addSpace(s.name);
                    }}
                  >
                    {s.name}
                  </StyledSpacesModalCard>
                );
              })}
            </StyledModalSpacesContainer>
            <StyledModalLabel>Create a few spaces</StyledModalLabel>
            <StyledModalTextInForm>
              Start with current projects, ongoning discussion topics, or
              anything else you would have a meeting about.
            </StyledModalTextInForm>
            <StyledModalInput
              placeholder="ie. Products Proposals"
              name="addedSpace1"
              onChange={props.handleInputChange}
              value={props.addedSpace1}
            />
            <StyledModalInput
              placeholder="ie. Design Review"
              name="addedSpace2"
              onChange={props.handleInputChange}
              value={props.addedSpace2}
            />
          </StyledModalForm>
        </Modal.Content>
        <Modal.Actions>
          <StyledActionButtonsContainer>
            <StyledModalButton
              onClick={e => {
                let orgId = uuid();
                e.preventDefault();
                Promise.all([
                  props.showModal('null'),
                  props.addOrganisationToUsers(orgId),
                  props.addSpacesToSpacesAndUsers(orgId),
                  props.addSpaceFromInput1ToOrganisationsAndUsers(orgId),
                  props.addSpaceFromInput2ToOrganisationsAndUsers(orgId),
                  props.clearState(),
                  props.addOrganisationToDatabase(orgId)
                ]).then(values => {
                  redirect(`/mainscreen/${orgId}`);
                });
              }}
            >
              Finish
            </StyledModalButton>
            <StyledModalMainButtonContainer>
              <StyledModalButton
                className="cancel-button"
                onClick={e => {
                  e.preventDefault();
                  props.showModal('InviteYourTeamModal');
                }}
              >
                Back
              </StyledModalButton>
            </StyledModalMainButtonContainer>
          </StyledActionButtonsContainer>
        </Modal.Actions>
      </StyledModalCard>
    </Modal>
  );
};

export default CreateSpacesModal;

const StyledModalH1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-weight: 300;
`;

const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 50px;
  border-radius: 5px;
`;

const StyledModalForm = styled.form`
  padding: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  .heading {
    padding-bottom: 40px;
  }
`;

const StyledModalLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 10px;
  color: black;
  .ligther-font {
    font-size: 0.8rem;
    color: #bdc3c9;
  }
`;
const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1rem;
  }
  &:focus {
    border-bottom: 2px solid #00bc98;
  }
`;

const StyledModalButton = styled.button`
  width: 100px;
  padding: 5px 15px;
  margin: 0 25px 25px 0;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #00bc98;
`;

const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

const StyledModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #00bc98;
    background-color: white;
    border: 2px solid #00bc98;
  }
`;

const StyledModalTextInForm = styled.div`
  line-height: 1.6;
  color: black;
  padding-bottom: 25px;
`;

const StyledModalSpacesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  .eggplant {
    background-color: #403b4f;
    border: 2px solid #403b4f;
  }
  .darkgreen {
    background-color: #2e7c87;
    border: 2px solid #2e7c87;
  }
  .violet {
    background-color: #5c44f2;
    border: 2px solid #5c44f2;
  }
  .darkolive {
    background-color: #36484e;
    border: 2px solid #36484e;
  }
  .yellow {
    background-color: #d99e49;
    border: 2px solid #d99e49;
  }
  .red {
    background-color: #f26551;
    border: 2px solid #f26551;
  }
  .lightblue {
    background-color: #19a9e3;
    border: 2px solid #19a9e3;
  }
  .green {
    background-color: #19bd98;
    border: 2px solid #19bd98;
  }
  .borderclass {
    border: 2px solid #00bc98;
  }
`;

const StyledSpacesModalCard = styled.div`
  width: 24%;
  color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
