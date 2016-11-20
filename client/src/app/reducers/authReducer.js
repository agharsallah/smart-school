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
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signup: true, error: {} };
    case SIGNUP_FAILURE:
      return { ...state, signup: false, error: { signup: action.payload } };
    case SIGNUP_RESEND_FAILURE:
      return { ...state, signup: true, error: { signupResend: action.payload } };
    case SIGNUP_SUCCESS_ADMIN:
      return { ...state, signupAdmin: true, error: {} };
    case SIGNUP_FAILURE_ADMIN:
      return { ...state, signupAdmin: false, error: { signupAdmin: action.payload } };
    case VERIFY_EMAIL_ERROR:
      return { ...state, signup: true, error: { verifyEmail: action.payload } };
    case SIGNIN_FAILURE:
      return { ...state, error: { signin: action.payload } };
    case AUTH_USER:
      return { ...state, authenticated: true, error: {} };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: {} };
  }

  return state;
}