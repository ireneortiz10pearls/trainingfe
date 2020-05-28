import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCourseChapters } from '../../../actions/coursechapter';
import ChapterItem from './ChapterItem';

const CourseChapters = ({
  courseId,
  getCourseChapters,
  courseChapter: { courseChapters, loading },
}) => {
  useEffect(() => {
    getCourseChapters(courseId);
  }, [getCourseChapters]);

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
                    </thead>
                    <tbody>
                      {courseChapters.length > 0 ? (
                        courseChapters.map((courseChapter) => (
                          <ChapterItem
                            key={courseChapter.id}
                            courseChapterItem={courseChapter}
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
