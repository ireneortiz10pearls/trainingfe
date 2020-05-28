import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory, getCategoryById } from '../../../actions/category';
import { Link } from 'react-router-dom';

const CategoryItem = ({
  deleteCategory,
  categoryItem: {
    id,
    name,
    type,
    isActive = false,
    Setting: { setname },
  },
}) => {
  function confirmDelete(id) {
    if (window.confirm('Are you sure to delete category?')) {
      deleteCategory(id);
    } else {
      return;
    }
  }
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{setname}</td>
      {/* <td>
        <div class='form-check'>
          <label class='form-check-label'>
            <input
              class='form-check-input'
              type='checkbox'
              value=''
              checked={isActive}
            />
            <span class='form-check-sign'>
              <span class='check'></span>
            </span>
          </label>
        </div>
      </td> */}
      <td>
        <button
          type='button'
          class='btn btn-danger'
          onClick={(e) => confirmDelete(id)}
        >
          Delete
        </button>
        <Link to={`/categoryedit/${id}`} className='btn btn-info my-1'>
          Edit
        </Link>
      </td>
    </tr>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory })(CategoryItem);
