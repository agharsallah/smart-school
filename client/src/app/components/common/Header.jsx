import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  componentWillMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  render() {
    return (
      <header>
        <Link to={(this.props.authenticated && this.user.position === 'Admin') ?
          '/reduxauth/AdminUser' : 
          ((this.props.authenticated && this.user.position === 'Student') ? 
          '/reduxauth/users': 
          '/reduxauth')}
          className="logo">école intelligent</Link>
          <nav>
            {
              (this.props.authenticated && this.user.position === 'Admin')  ?
                <ul>
                  <li>
                    <Link to='/reduxauth/adminHome' activeClassName="active">Acceuil</Link>
                  </li>
                  <li>
                    <Link to='/reduxauth/manageClass' activeClassName="active">Gérer Classes</Link>
                  </li>
                  <li>
                    <Link to="/reduxauth/signout" activeClassName="active">Signout</Link>
                  </li>
                </ul>
                :(
                    (this.props.authenticated) ?
                    <ul>
                      <li>
                        <Link to='/reduxauth/users' activeClassName="active">Acceuil</Link>
                      </li>
                      <li>
                        <Link to="/reduxauth/signout" activeClassName="active">Signout</Link>
                      </li>
                      <p>{console.log(this.user.position)}</p>
                    </ul>
                    :
                    <ul>
                      <li>
                        <Link to="/reduxauth/signin">Sign in</Link>
                      </li>
                      <li>
                        <Link to="/reduxauth/signup">Sign up</Link>
                      </li>
                    </ul>
                  )
            }
          </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);