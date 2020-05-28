import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getUsers } from '../../../actions/user';
import UserItem from './UserItem';
import { Link } from 'react-router-dom';

const Users = ({ getUsers, user: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h2 className='card-title '>Members</h2>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className=' text-warning'>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      {/* <th>Active</th> */}
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <UserItem key={user.id} userItem={user} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link to={'/register'} className='btn btn-warning my-1'>
                  Add Member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { getUsers })(Users);
