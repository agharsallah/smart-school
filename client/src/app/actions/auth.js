import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  SIGNUP_SUCCESS_ADMIN,
  SIGNUP_FAILURE_ADMIN,
  VERIFY_EMAIL_ERROR,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index';

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Sign up Student
 */
export function signupUser(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/signup`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });

        browserHistory.push(`/reduxauth/signup/verify-email?email=${props.email}`);
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

/**
 * Sign up Admin
 */
export function signupAdmin(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/signupAdmin`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS_ADMIN });

        browserHistory.push(`/reduxauth/signupAdmin/verify-email?email=${props.email}`);
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE_ADMIN, response.data.error)));
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  const { email, password } = props;

  return function (dispatch) {
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        /*check if the user is Admin redirect him to admin component else student component*/
       console.log('auth')
       console.log(response.data.position)
        if (response.data.position === 'Admin') {
          /*browserHistory.push('/reduxauth/adminHome');*/
          window.location.href = "/reduxauth/adminHome";
        }else{
          /*browserHistory.push('/reduxauth/users');*/
          window.location.href = "/reduxauth/users";
        }
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}


/**
 * Resend verification code
 */
export function resendVerification(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/resend-verify-code`, props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(response => dispatch(authError(SIGNUP_RESEND_FAILURE, response.data)));
  }
}


/**
 * Verify email
 */
export function verifyEmail(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/signup/verify-email`, props)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push('/reduxauth/users');
      })
      .catch(response => dispatch(authError(VERIFY_EMAIL_ERROR, response.data.error)));
  }
}

/**
 * Sign out
 */
export function signoutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER,
  }
}
