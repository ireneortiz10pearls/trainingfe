import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser, getUserById } from '../../../actions/user';
import { Link } from 'react-router-dom';

const UserItem = ({
  deleteUser,
  userItem: {
    id,
    firstName,
    lastName,
    email,
    Setting: { setname },
  },
}) => {
  function confirmDelete(id) {
    if (window.confirm('Are you sure to delete user?')) {
      deleteUser(id);
    } else {
      return;
    }
  }
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{setname}</td>
      <td>
        <button
          type='button'
          class='btn btn-danger'
          onClick={(e) => confirmDelete(id)}
        >
          Delete
        </button>
        <Link to={`/useredit/${id}`} className='btn btn-info my-1'>
          Edit
        </Link>
      </td>
    </tr>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserItem);
