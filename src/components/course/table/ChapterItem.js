import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {} from '../../../actions/coursechapter';

const CourseChapterItem = ({
  courseChapterItem: { id, name, order, length, percentage, isActive = false },
}) => {
  return (
    <tr key={id}>
      <td>{order}</td>
      <td>{name}</td>
      <td>{length}</td>
    </tr>
  );
};

CourseChapterItem.propTypes = {
  courseChapter: PropTypes.object.isRequired,
};

export default CourseChapterItem;
