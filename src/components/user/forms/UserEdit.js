import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserById, editUser } from '../../../actions/user';
import PropTypes from 'prop-types';
import { getList } from '../../../actions/list';
import { withRouter } from 'react-router-dom';

const UserEdit = ({
  setAlert,
  getUserById,
  editUser,
  getList,
  user: { user, loading },
  list: { list },
  match,
  history,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    roleId: '',
  });

  useEffect(() => {
    getList('RoleType');
  }, [getList]);

  useEffect(() => {
    const fetchUser = async () => await getUserById(match.params.id);
    fetchUser();
  }, [loading, getUserById]);

  useEffect(() => {
    if (!loading && user) {
      setFormData({
        id: user.id,
        firstName: loading || !user.firstName ? '' : user.firstName,
        lastName: loading || !user.lastName ? '' : user.lastName,
        email: loading || !user.email ? '' : user.email,
        password: loading || !user.password ? '' : user.password,
        password2: loading || !user.password ? '' : user.password,
        roleId: loading || !user.roleId ? '' : user.roleId,
        isActive: loading || !user.isActive ? '' : user.isActive,
      });
    }
  }, [loading, user]);

  const {
    id,
    firstName,
    lastName,
    email,
    password,
    password2,
    roleId,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      editUser({ id, firstName, lastName, email, password, roleId }, history);
    }
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Member Creation</h3>
                <p className='card-category'>
                  {' '}
                  <i className='material-icons'>group_add</i> Add a Member
                </p>
              </div>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>User Id</label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Category Id'
                          name='id'
                          value={id}
                          disabled
                        />
                      </div>{' '}
                    </div>
                  </div>
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
                    className='btn btn-tenpearls'
                    value='Edit'
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

UserEdit.propTypes = {
  editUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ list: state.list, user: state.user });

export default connect(mapStateToProps, {
  editUser,
  getUserById,
  getList,
})(withRouter(UserEdit));
