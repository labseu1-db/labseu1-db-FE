import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddCompany extends Component {
  //Proptypes check - not required, but preferable
  static propTypes = {
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };

  //Local state for input field
  state = { company: '' };

  //Function to clear input after sending data to database
  clearInput() {
    this.setState({ company: '' });
  }

  //Add company to database
  addCompany() {
    this.props.firestore.add(
      //collection name
      { collection: 'companiesTEST' },
      //add state.company info to field companyName in collection
      {
        companyName: 'this.state.company'
      }
    );
    this.clearInput();
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
        <button
          onClick={e => {
            e.preventDefault();
            this.addCompany();
          }}>
          Add Company
        </button>
      </div>
    );
  }
}

//As we are not getting any props from database - this is empty
const mapStateToProps = state => {
  return {};
};

//As we are not dispatching anything - this is empty
const mapDispatchToProps = {};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(AddCompany);
