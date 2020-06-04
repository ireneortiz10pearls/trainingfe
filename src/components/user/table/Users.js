import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getUsers, deleteUser } from '../../../actions/user';
import { Link, useHistory } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';

const Users = ({ getUsers, deleteUser, user: { users, loading } }) => {
  const [datatable, setDatatable] = useState({});
  let history = useHistory();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (!loading && users) {
      let rows = users.map((user) => {
        const {
          id,
          Setting: { setname },
        } = user;
        if (!user.hasOwnProperty('setname')) {
          Object.defineProperty(user, 'setname', {
            value: setname,
          });
        } else {
          Object.assign(user, 'setname', {
            value: setname,
          });
        }

        if (!user.hasOwnProperty('action')) {
          return Object.defineProperty(user, 'action', {
            value: (
              <Fragment>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        } else {
          return;
          Object.assign(user, 'action', {
            value: (
              <Fragment>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        }
      });
      setDatatable({
        columns: [
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
          },
          {
            label: 'First Name',
            field: 'firstName',
          },
          {
            label: 'Last Name',
            field: 'lastName',
          },
          {
            label: 'Email',
            field: 'email',
          },
          {
            label: 'Role',
            field: 'setname',
          },
          {
            label: 'Actions',
            field: 'action',
          },
        ],
        rows: rows,
      });
    }
  }, [users]);

  function confirmDelete(id) {
    if (window.confirm('Are you sure to delete user?')) {
      deleteUser(id);
    } else {
      return;
    }
  }

  function handleEditClick(id, e) {
    e.preventDefault();
    history.push(`/useredit/${id}`);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Members</h3>
              </div>
              <div className='card-body'>
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                />
                <Link to={'/register'} className='btn btn-tenpearls my-1'>
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
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);
