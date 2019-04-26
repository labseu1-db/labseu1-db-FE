import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CompanyList extends Component {
  static propTypes = {
    company: PropTypes.arrayOf(PropTypes.string)
  };

  renderCompany(company) {
    return <div key={company}>{company}</div>;
  }

  render() {
    const companyNames = this.props.companies.map(name => this.renderCompany(name));

    return (
      <div>
        <div>{companyNames}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.firestore.ordered.companiesTEST ? state.firestore.ordered.companiesTEST.map(c => c.companyName) : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'companiesTEST'
      }
    ];
  })
)(CompanyList);
