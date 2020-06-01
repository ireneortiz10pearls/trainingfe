import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCourseChapter } from '../../../actions/coursechapter';
import { withRouter } from 'react-router-dom';

const CourseChapterAdd = ({
  idCourse,
  addCourseChapter,
  history,
  toggleModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    order: '',
    courseId: idCourse,
    length: '',
    percentage: '',
    isActive: true,
  });

  const { courseId, name, order, length, percentage, isActive } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCourseChapter(formData, history);
    toggleModal();
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              {/* <div className='card-header card-header-warning'>
                <h3 className='card-title '></h3>
                <p className='card-courseChapter'>
                  <i className='material-icons'>bookmarks</i> Add Chapter
                </p>
              </div> */}
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Chapter Order Number
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          placeholder='Order Number'
                          name='order'
                          value={order}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Chapter Name
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Name'
                          name='name'
                          value={name}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Chapter Length (minutes)
                        </label>
                        <input
                          className='form-control'
                          type='number'
                          placeholder='Length (minutes)'
                          name='length'
                          value={length}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <input
                    type='submit'
                    className='btn btn-warning'
                    value='Add'
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

CourseChapterAdd.propTypes = {
  addCourseChapter: PropTypes.func.isRequired,
};

export default connect(null, { addCourseChapter })(
  withRouter(CourseChapterAdd)
);
