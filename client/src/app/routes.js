import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/App';
import UserList from './components/users/UserList';
import AdminHome from './components/users/admin/AdminHome';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import SignupAdmin from './components/auth/admin/SignupAdmin';
import VerifyEmail from './components/auth/VerifyEmail';
import SignupVerify from './components/auth/SignupVerify';
import ResetPassword from './components/resetPassword/ResetPassword';
import ResetPasswordVerify from './components/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './components/resetPassword/ResetPasswordNew';
import ManageClass from './components/users/admin/ManageClass';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';
import requireAdminAuth from './components/hoc/RequireAdminAuth';

export default (
  <Router path="/reduxauth" history={ browserHistory } component={App} >
    <IndexRoute component={requireNotAuth(Signup)} />
    <Route path="signin" component={requireNotAuth(Signin)} />
    <Route path="signup" component={requireNotAuth(Signup)} />
    <Route path="signupAdmin" component={requireNotAuth(SignupAdmin)} />
    <Route path="signout" component={Signout} />
    <Route path="signup/verify-email" component={requireNotAuth(SignupVerify)} />
    <Route path="verify-email" component={requireNotAuth(VerifyEmail)} />
    <Route path="reset-password" component={requireNotAuth(ResetPassword)} />
    <Route path="reset-password/verify" component={ResetPasswordVerify} />
    <Route path="reset-password/new" component={requireNotAuth(ResetPasswordNew)} />
    <Route path="users" component={requireAuth(UserList)} />
    <Route path="adminHome" component={requireAdminAuth(AdminHome)} />
    <Route path="manageClass" component={requireAdminAuth(ManageClass)} />
  </Router>
)
