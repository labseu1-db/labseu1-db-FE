import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddCompany extends Component {
  static propTypes = {
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  };
  state = { company: '' };

  addCompany() {
    this.props.firestore.add(
      { collection: 'test-companies' },
      {
        companyName: this.state.company
      }
    );
    this.setState({ company: '' });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.company} onChange={evt => this.setState({ company: evt.target.value })} />
        <button
          onClick={evt => {
            evt.preventDefault();
            this.addCompany();
          }}>
          Add Company
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(AddCompany);
