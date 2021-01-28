import React, { Fragment, useState } from 'react';
import { Link, Redirect,  useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, loadUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { forgotPassword } from '../../actions/user';

const Login = ({ login, isAuthenticated,  setAlert, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let history = useHistory();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  
  function handleForgotPasswordClick(email, e) {
    e.preventDefault();
    if (email == '') {
      setAlert('Email is required.', 'danger');
    } else {
      forgotPassword(email);
    }
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Sign In</h3>
                <p className='card-category'>
                  {' '}
                  <i className='material-icons'>fingerprint</i> Sign Into Your
                  Account
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Email Address
                        </label>
                        <input
                          className='form-control'
                          type='email'
                          placeholder='Email Address'
                          name='email'
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Password</label>
                        <input
                          className='form-control'
                          type='password'
                          placeholder='Password'
                          name='password'
                          minLength='6'
                          value={password}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    className='btn btn-tenpearls'
                    value='Login'
                  />
                  <input
                    onClick={(e) => handleForgotPasswordClick(email, e)}
                    className='btn btn-tenpearls'
                    value='Forgot Password'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert, forgotPassword })(Login);
