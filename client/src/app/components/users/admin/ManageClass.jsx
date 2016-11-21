import React, { Component } from 'react';
import * as actions from '../../../actions/users';
import { connect } from 'react-redux';

class ManageClass extends Component {
  componentWillMount() {
    this.props.fetchUsers();

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  render() {
    return (
      <div className="content users">
        <h1>You can manage ur class from here</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.user.list };
}

export default connect(mapStateToProps, actions)(ManageClass);