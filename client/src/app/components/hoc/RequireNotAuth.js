import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.props.authenticated && this.user.position === 'Admin') {
        browserHistory.push('/reduxauth/adminHome');
      }else if (this.props.authenticated && this.user.position === 'Student') {
        browserHistory.push('/reduxauth/users');
      }
    }

/*    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        browserHistory.push('/reduxauth/users');
      }
    }*/

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  NotAuthentication.propTypes = { authenticated: PropTypes.bool };

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(NotAuthentication);
}
