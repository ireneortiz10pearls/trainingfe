import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/user';
import PropTypes from 'prop-types';
import { getList } from '../../../actions/list';
import { withRouter } from 'react-router-dom';

const Register = ({
  setAlert,
  register,
  getList,
  list: { list, loading },
  history,
}) => {
  useEffect(() => {
    getList('RoleType');
  }, [getList]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    roleId: '',
  });

  const { firstName, lastName, email, password, password2, roleId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      register({ firstName, lastName, email, password, roleId, history });
    }
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h3 className='card-title '>Member Creation</h3>
                <p className='card-category'>
                  {' '}
                  <i className='material-icons'>group_add</i> Add a Member
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>First Name</label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='First Name'
                          name='firstName'
                          value={firstName}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Last Name</label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Last Name'
                          name='lastName'
                          value={lastName}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
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
                      </div>{' '}
                    </div>

                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Confirm Password
                        </label>
                        <input
                          className='form-control'
                          type='password'
                          placeholder='Confirm Password'
                          name='password2'
                          minLength='6'
                          value={password2}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
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
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>Role</label>
                        <select
                          className='form-control selectpicker'
                          onChange={(e) => onChange(e)}
                          name='roleId'
                          value={roleId}
                          data-style='btn btn-link'
                        >
                          <option>Select Role</option>
                          {list.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.setname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    className='btn btn-warning'
                    value='Register'
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list });

export default connect(mapStateToProps, { setAlert, register, getList })(
  withRouter(Register)
);
