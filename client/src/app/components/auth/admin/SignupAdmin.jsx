import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../actions/auth';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class SignupAdmin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.signupAdmin(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>Sign up Administrator</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* Firstname */}
          <Field name="firstname" component={renderField} type="text" placeholder="First name" />

          {/* Lastname */}
          <Field name="lastname" component={renderField} type="text" placeholder="Last name" />

          {/* Email */}
          <Field name="email" component={renderField} type="text" placeholder="Email" />

          {/* school */}
          <Field name="school" component={renderField} type="text" placeholder="school" />

          {/* Password */}
          <Field name="password" component={renderField} type="password" placeholder="Password" />

          {/* Email */}
          <Field name="repassword" component={renderField} type="password" placeholder="Repeat Password" />

          {/* Server error message */}
          <div>
            { this.props.errorMessage && this.props.errorMessage.signupAdmin &&
                <div className="error-container">Oops! { this.props.errorMessage.signupAdmin }</div> }
          </div>

          {/* Submit button */}
          <button type="submit" className="btn">Sign up</button>

          {/* Sign in button */}
          <div className="form-bottom">
            <p>Already signed up?</p>
            <Link to="/reduxauth/signin">Click here to sign in</Link>
          </div>
        </form>
      </div>
    )
  }
}

const validate = props => {
  console.log(props)
  const errors = {};
  const fields = ['firstname', 'lastname', 'email', 'school', 'password', 'repassword'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.firstname && props.firstname.length < 3) {
    errors.firstname = "minimum of 4 characters";
  }

  if(props.firstname && props.firstname.length > 20) {
    errors.firstname = "maximum of 20 characters";
  }

  if(props.lastname && props.lastname.length < 3) {
    errors.lastname = "minimum of 4 characters";
  }

  if(props.lastname && props.lastname.length > 20) {
    errors.lastname = "maximum of 20 characters";
  }

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "please provide valid email";
  }

  if(props.school && props.school.length > 20) {
    errors.school = "maximum of 20 characters";
  }

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
};


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SignupAdmin = reduxForm({ form: 'signupAdmin', validate })(SignupAdmin);

export default connect(mapStateToProps, actions)(SignupAdmin);
