import React, { Component } from 'react'
import { Header, Checkbox, Form, Modal, Dropdown, Popup } from 'semantic-ui-react'
import plusIcon from '../images/icon-plus-lightgray.svg';
import { StyledContainer, StyledButtonCancel, StyledButtonCreateSpace, StyledInput, StyledMainHeader, StyledOptional } from './styled-components/StyledCreateSpace';

export default class CreateNewSpace extends Component {
    state = {}
    handleInputChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Modal trigger={<div>
                <img src={plusIcon} alt='plus icon' />
            </div>} size='tiny'>
                <StyledContainer>
                    <Modal.Header>
                        <div>
                            <StyledMainHeader>
                                Create a new space
                          </StyledMainHeader>
                        </div>
                        <div>
                            <Header as='h5'>Space name</Header>
                            <StyledInput
                                name='spaceName'
                                placeholder='Product Design'
                            />
                            <Header as='h5'>What types of discussions happen here?<StyledOptional>(Optional)</StyledOptional></Header>
                            <StyledInput
                                name='spaceType'
                                placeholder='Questions and thoughts about proposals'
                            />
                            <Header as='h5'>Members</Header>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Add everyone in mango'
                                    name='checkboxRadioGroup'
                                    value='this'
                                    checked={this.state.value === 'this'}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Field>
                            <br />
                            <Form.Field>
                            </Form.Field>
                            <Popup trigger={<Checkbox
                                radio
                                label="Choose people to add"
                                name='checkboxRadioGroup'
                                value='that'
                                checked={this.state.value === 'that'}
                                onChange={this.handleInputChange}
                            >
                            </Checkbox>}>
                                <Dropdown
                                    label='Choose people to add'
                                    placeholder='Add emails or people'
                                />
                            </Popup>
                            <Modal.Actions>
                                <StyledButtonCancel>Cancel</StyledButtonCancel>
                                <StyledButtonCreateSpace>Create Space</StyledButtonCreateSpace>
                            </Modal.Actions>
                        </div>
                    </Modal.Header>
                </StyledContainer>
            </Modal>

        )
    }
}
