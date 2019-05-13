import React, { Component } from "react";
import {
    Header,
    Checkbox,
    Form,
    Modal,
    Dropdown,
    Popup
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, isEmpty, isLoaded, withFirestore } from 'react-redux-firebase';
import uuid from 'uuid';
import plusIcon from "../../images/icon-plus-lightgray.svg";

//Redux action
import { showModal } from '../../redux/actions/actionCreators'

//Styled components
import styled from "styled-components";

class CreateNewSpaceModal extends Component {
    state = {
        spaceName: '',
        createdSpaces: [],
        addedSpace1: '',
    };

    addSpaceName = name => {
        this.setState({ spaceName: name });
    };


    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');
    }

    addSpace = space => {
        const indexOfSpace = this.state.createdSpaces.indexOf(space);
        console.log(indexOfSpace);
        if (indexOfSpace > -1) {
            const arrayWithoutSpace = this.state.createdSpaces.filter(s => {
                return s !== space;
            });
            this.setState({ createdSpaces: arrayWithoutSpace });
        } else {
            this.setState(pr => ({
                createdSpaces: [...pr.createdSpaces, space]
            }));
        }
    };

    //Add information about created space that were collected in modals to firestore
    spaceId = uuid();
    addSpaceToDatabase = () => {
        this.props.firestore.set(
            { collection: 'spaces', doc: this.spaceId },
            {
                spaceName: this.state.spaceName,
                spaceCreatedByUserId: this.props.auth.uid
            }
        );
    };

    clearState = () => {
        this.setState({
            spaceName: null,
            createdSpaces: [],
            addedSpace1: '',
        });
    };

    //If user is not logged in, push user to login page
    componentDidUpdate() {
        if (isEmpty(this.props.auth)) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <Modal
                trigger={
                    <div>
                        <img src={plusIcon} alt="plus icon" />
                    </div>
                }
                size="tiny"
            >
                <StyledContainer>
                    <Modal.Header>
                        <div>
                            <StyledMainHeader>Create a new space</StyledMainHeader>
                        </div>
                        <div>
                            <Header as="h5">Space name</Header>
                            <StyledInput
                                name="spaceName"
                                placeholder="Product Design"
                                type="text"
                                required
                                onChange={this.handleInputChange}
                                value={this.state.spaceName}
                            />
                            <Header as="h5">
                                What types of discussions happen here?
                <StyledOptional>(Optional)</StyledOptional>
                            </Header>
                            <StyledInput
                                name="spaceType"
                                placeholder="Questions and thoughts about proposals"
                            />
                            <Header as="h5">Members</Header>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label="Add everyone in mango"
                                    name="checkboxRadioGroup"
                                    value="this"
                                    checked={this.state.value === "this"}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Field>
                            <br />
                            <Form.Field />
                            <Popup
                                trigger={
                                    <Checkbox
                                        radio
                                        label="Choose people to add"
                                        name="checkboxRadioGroup"
                                        value="that"
                                        checked={this.state.value === "that"}
                                        onChange={this.handleInputChange}
                                    />
                                }
                            >
                                <Dropdown
                                    label="Choose people to add"
                                    placeholder="Add emails or people"
                                />
                            </Popup>
                            <Modal.Actions>
                                <StyledButtonCancel disabled={!this.state.spaceName.length > 0}>
                                    Cancel
                </StyledButtonCancel>
                                <StyledButtonCreateSpace
                                    type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.addSpace();
                                        console.log('This space has been created:', this.state.spaceName);

                                    }}
                                >
                                    Create Space
                </StyledButtonCreateSpace>
                            </Modal.Actions>
                        </div>
                    </Modal.Header>
                </StyledContainer>
            </Modal>
        );
    }
}

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        activeModal: state.modal.activeModal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ showModal }, dispatch);
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(),
    withFirestore
)(CreateNewSpaceModal);

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;

const StyledButtonCancel = styled.button`
  margin-top: 50px;
  margin-left: 253px;
  margin-right: 12px;
  padding: 5px 15px;
  color: #5c4df2;
  border-radius: 15px;
  background-color: white;
  border-color: #5c4df2;
`;

const StyledButtonCreateSpace = styled.button`
  padding: 5px 15px;
  color: white;
  border-radius: 15px;
  background-color: lightgray;
  &:focus {
    background-color: #5c4df2;
  }
`;

const StyledInput = styled.input`
  width: 470px;
  font-size: 19px;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #6c48f2;
    outline: none;
  }
`;

const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: "Open Sans";
  padding-bottom: 30px;
`;

const StyledOptional = styled.div`
  font-size: 14px;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  line-height: 1.82;
  color: rgba(38, 46, 51, 0.5);
  margin-left: 257px;
  margin-top: -24px;
`;
