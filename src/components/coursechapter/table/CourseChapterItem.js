import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourseChapter } from '../../../actions/coursechapter';
import { Link } from 'react-router-dom';

const CourseChapterItem = ({
  courseId,
  courseTitle,
  deleteCourseChapter,
  courseChapterItem: { id, name, order, length, percentage, isActive = false },
}) => {
  function confirmDelete(id) {
    if (window.confirm('Are you sure to delete Chapter?')) {
      deleteCourseChapter(id);
    } else {
      return;
    }
  }
  return (
    <tr key={id}>
      <td>{order}</td>
      <td>{name}</td>
      <td>{length}</td>
      <td>
        <button
          type='button'
          className='btn btn-danger'
          onClick={(e) => confirmDelete(id)}
        >
          Delete
        </button>
        <Link
          to={`/coursechapteredit/${courseId}/${courseTitle}/${id}`}
          className='btn btn-info my-1'
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

CourseChapterItem.propTypes = {
  deleteCourseChapter: PropTypes.func.isRequired,
};

export default connect(null, { deleteCourseChapter })(CourseChapterItem);
