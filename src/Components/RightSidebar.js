import React from "react";
import styled from "styled-components";
import { Modal, Image } from "semantic-ui-react";
import checkMarkOff from "../images/icon-check-darkgray.svg";
import checkMarkOn from "../images/icon-check-purple.svg";
//import plantImg from '../images/img-bg-plant.png';
import plantImg from "../images/tulip.svg";
import discussionImg from "../images/img-modal-discussion.svg";
import mobileImg from "../images/img-modal-mobile.svg";
import voiceImg from "../images/img-modal-voice.svg";

export default class RightSidebar extends React.Component {
  toggleCheckFirst = () => {
    let check = document.getElementById("check01");
    check.src === checkMarkOn
      ? (check.src = checkMarkOn)
      : (check.src = checkMarkOn);
  };
  toggleCheckSecond = () => {
    let check = document.getElementById("check02");
    check.src === checkMarkOn
      ? (check.src = checkMarkOn)
      : (check.src = checkMarkOn);
  };
  toggleCheckThird = () => {
    let check = document.getElementById("check03");
    check.src === checkMarkOn
      ? (check.src = checkMarkOn)
      : (check.src = checkMarkOn);
  };
  render() {
    return (
      <StyledContainer>
        <SearchSpace />
        <GetStarted>
          <GetStartedTop>
            <PlantImg src={plantImg} alt='plant' />
            <p>Let's Get Started!</p>
          </GetStartedTop>
          <GetStartedCheckboxes>
            <GetStartedCheck>
              <CheckImg src={checkMarkOn} alt='checkMarkOn' />
              <Paragraph>Create an organization</Paragraph>
            </GetStartedCheck>
            <GetStartedCheck>
              <CheckImg src={checkMarkOn} alt='checkMarkOff' />
              <Paragraph>Create space</Paragraph>
            </GetStartedCheck>
            <GetStartedCheck>
              <CheckImg src={checkMarkOn} alt='checkMarkOn' />
              <Paragraph>Invite Team Members</Paragraph>
            </GetStartedCheck>
          </GetStartedCheckboxes>
        </GetStarted>

        <LearnMore>
          <p>Learn about Threads</p>
          <LearnTopic onClick={this.toggleCheckFirst}>
            <CheckImg src={checkMarkOff} alt='checkMarkOff' id='check01' />
            <Modal size='tiny' trigger={<Paragraph>What is Pinely?</Paragraph>}>
              <ModalImg>
                <Image src={discussionImg} size='medium' centered />
              </ModalImg>

              <StyledContent>
                <Modal.Content>
                  <h3>What is Pinely?</h3>
                  <Modal.Description>
                    <p>
                      With Pinely your team will be able to participate in forum
                      conversations where they can share news, content, or
                      comment on other people’s threads. Make decision making
                      simpler, more pleasant and more productive.
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </StyledContent>
            </Modal>
          </LearnTopic>
          <LearnTopic onClick={this.toggleCheckSecond}>
            <CheckImg src={checkMarkOff} alt='checkMarkOff' id='check02' />
            <Modal
              size='tiny'
              trigger={
                <Paragraph>What are spaces and how do I use them? </Paragraph>
              }
            >
              <ModalImg>
                <Image src={mobileImg} size='medium' centered />
              </ModalImg>
              <StyledContent>
                <Modal.Content>
                  <h3>What are spaces and how do I use them?</h3>
                  <Modal.Description>
                    <p>
                      You can create spaces for the different departments in
                      your organisation, projects or topics to keep everything
                      in its place. Spaces will help your team to stay focused
                      and find discussions that are relevant to them. Start with
                      a few spaces, invite your teammates and add more as
                      needed.
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </StyledContent>
            </Modal>
          </LearnTopic>
          <LearnTopic onClick={this.toggleCheckThird}>
            <CheckImg src={checkMarkOff} alt='checkMarkOff' id='check03' />
            <Modal
              size='tiny'
              trigger={<Paragraph>How do I use threads?</Paragraph>}
            >
              <ModalImg>
                <Image src={voiceImg} size='medium' centered />
              </ModalImg>
              <StyledContent>
                <Modal.Content>
                  <h3>How do I use threads?</h3>
                  <Modal.Description>
                    <p>
                      Anyone can create a thread inside a space they belong to.
                      Using threads you can start a discussion about a
                      particular topic and asks for your team's opinions to
                      arrive to a final decision, and mark it as such so
                      everyone can be informed.
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </StyledContent>
            </Modal>
          </LearnTopic>
        </LearnMore>
      </StyledContainer>
    );
  }
}

const Paragraph = styled.p`
  padding-left: 10px;
`;
const CheckImg = styled.img`
  height: 12px;
`;
const SearchSpace = styled.div`
  height: 10hv;
`;
const StyledContainer = styled.div`
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
const GetStarted = styled.div`
  border-radius: 15px;
  -webkit-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
  -moz-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
  box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
`;
const GetStartedTop = styled.div`
  background-color: #00bc98;
  border-radius: 15px 15px 0 0;
  color: white;
  text-align: end;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const PlantImg = styled.img`
  height: 80px;
  padding-top: 15px;
`;
const GetStartedCheckboxes = styled.div`
  background-color: white;
  border-radius: 0 0 15px 15px;
  padding: 10px;
`;
const GetStartedCheck = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
const LearnMore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
`;
const LearnTopic = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 7px;
  -webkit-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
  -moz-box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
  box-shadow: 0px 15px 35px -34px rgba(92, 92, 91, 1);
`;
const ModalImg = styled.div`
  padding: 25px 0;
`;
const StyledContent = styled.div`
  background-color: #fff7f3;
  padding: 35px;
`;
