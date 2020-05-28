import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCourseChapters } from '../../../actions/coursechapter';
import CourseChapterItem from './CourseChapterItem';
import { Link } from 'react-router-dom';
import Modali, { useModali } from 'modali';
import CourseChapterAdd from '../forms/CourseChapterAdd';

const CourseChapters = ({
  courseId,
  courseTitle,
  getCourseChapters,
  courseChapter: { courseChapters, loading },
}) => {
  useEffect(() => {
    getCourseChapters(courseId);
  }, [getCourseChapters]);

  const [chapterAddModal, toggleChapterAddModal] = useModali();

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
                <h4 className='card-title '>Chapters</h4>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className=' text-warning'>
                      <th>Order</th>
                      <th>Name</th>
                      <th>Length (Min)</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {courseChapters.length > 0 ? (
                        courseChapters.map((courseChapter) => (
                          <CourseChapterItem
                            key={courseChapter.id}
                            courseChapterItem={courseChapter}
                            courseId={courseId}
                            courseTitle={courseTitle}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No courseChapters found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link
                  to={`/coursechapteradd/${courseId}/${courseTitle}`}
                  className='btn btn-warning my-1'
                >
                  Add Chapter
                </Link>
                <button
                  className='btn btn-warning my-1'
                  onClick={toggleChapterAddModal}
                >
                  Add Chapter
                </button>
                <Modali.Modal {...chapterAddModal}>
                  <CourseChapterAdd
                    idCourse={courseId}
                    toggleModal={toggleChapterAddModal}
                  />
                </Modali.Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CourseChapters.propTypes = {
  getCourseChapters: PropTypes.func.isRequired,
  courseChapter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ courseChapter: state.courseChapter });

export default connect(mapStateToProps, { getCourseChapters })(CourseChapters);
