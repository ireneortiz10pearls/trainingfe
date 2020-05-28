import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCourse, getCourseById } from '../../../actions/course';
import { Link } from 'react-router-dom';
import Modali, { useModali } from 'modali';
import Chapters from './Chapters';

const CourseItem = ({
  deleteCourse,
  courseItem: {
    id,
    title,
    isActive,
    Category: { name },
  },
}) => {
  function confirmDelete(id) {
    if (window.confirm('Are you sure to delete course?')) {
      deleteCourse(id);
    } else {
      return;
    }
  }

  const [chaptersModal, toggleChaptersModal] = useModali();

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{name}</td>
      <td>
        {' '}
        <button class='btn btn-warning' onClick={toggleChaptersModal}>
          Chapters
        </button>
        <Modali.Modal {...chaptersModal}>
          <Chapters courseId={id} />
        </Modali.Modal>
      </td>
      <td>
        <button
          type='button'
          class='btn btn-danger'
          onClick={(e) => confirmDelete(id)}
        >
          Delete
        </button>
        <Link to={`/courseedit/${id}`} className='btn btn-info my-1'>
          Edit
        </Link>
      </td>
    </tr>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default connect(null, { deleteCourse })(CourseItem);
