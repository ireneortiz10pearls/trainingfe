import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editCourseChapter,
  getCourseChapterById,
} from '../../../actions/coursechapter';
import { withRouter } from 'react-router-dom';

const CourseChapterEdit = ({
  idCourse,
  getCourseChapterById,
  editCourseChapter,
  courseChapter: { courseChapter, loading },
  history,
  toggleModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    order: '',
    courseId: idCourse,
    length: '',
    percentage: '',
    isActive: '',
  });

  useEffect(() => {
    const fetchCourseChapter = async () => await getCourseChapterById(idCourse);
    fetchCourseChapter();
  }, [loading, getCourseChapterById]);

  useEffect(() => {
    if (!loading && courseChapter) {
      setFormData({
        id: courseChapter.id,
        name: loading || !courseChapter.name ? '' : courseChapter.name,
        order: loading || !courseChapter.order ? '' : courseChapter.order,
        courseId:
          loading || !courseChapter.courseId ? '' : courseChapter.courseId,
        length: loading || !courseChapter.length ? '' : courseChapter.length,
        isActive:
          loading || !courseChapter.isActive ? '' : courseChapter.isActive,
      });
    }
  }, [loading, courseChapter]);

  const { id, courseId, name, order, length, percentage, isActive } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editCourseChapter(formData, history);
    toggleModal();
  };

  return (
    <Fragment>
      {!loading && courseChapter && (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-warning'>
                  <h2 className='card-title '></h2>
                  <p className='card-courseChapter'>
                    <i className='material-icons'>bookmarks</i> Edit Chapter
                  </p>
                </div>
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
                      value='Edit'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

CourseChapterEdit.propTypes = {
  getCourseChapterById: PropTypes.func.isRequired,
  editCourseChapter: PropTypes.func.isRequired,
  courseChapter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  courseChapter: state.courseChapter,
});

export default connect(mapStateToProps, {
  editCourseChapter,
  getCourseChapterById,
})(withRouter(CourseChapterEdit));
