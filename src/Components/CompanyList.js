import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CompanyList extends Component {
  //Proptypes check - not required, but preferable
  static propTypes = {
    company: PropTypes.arrayOf(PropTypes.string)
  };

  //Get all companies from database, map trough them and render their names
  render() {
    const companyNamesInDatabase = this.props.companyNames;
    return (
      <div>
        <h2>These are the companies</h2>
        {companyNamesInDatabase.map((compName, index) => {
          return <div key={index}>{compName}</div>;
        })}
      </div>
    );
  }
}

//We are now using information from database => we need mapStateToProps:
//if there are no companies, return empty array
//if there are companies, map trough them and get their names
//WEIRD thing: there is a "order" required to have - I am not sure why, but it doesn't work without it
const mapStateToProps = state => {
  return {
    companyNames: state.firestore.ordered.companiesTEST ? state.firestore.ordered.companiesTEST.map(c => c.companyName) : []
  };
};

//We are not dispatching anything => mapDispatchToProps is empty
const mapDispatchToProps = {};

//Connect to Firestore
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
