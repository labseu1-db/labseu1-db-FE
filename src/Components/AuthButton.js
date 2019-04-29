import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'


class AuthButton extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }

  render() {
    console.log(this.props.auth)
    if (!isLoaded(this.props.auth)) {
      return null
    }
    if (isEmpty(this.props.auth)) {
      return (
        <div>
          <button
            onClick={
              () => this.props.firebase.login({ provider: 'google', type: 'popup' })
            }
          >Log in with Google</button>
        </div>
      )
    }
    return (
      <button
        style={{ width: "20rem" }}
        onClick={async () => {
          await this.props.firebase.logout()
          this.props.clearFirestore()
        }}
      >
        Logout
      </button >
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })

  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(AuthButton)
