import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCourses } from '../../../actions/course';
import CourseItem from './CourseItem';
import { Link } from 'react-router-dom';

const Courses = ({ getCourses, course: { courses, loading } }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

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
                <h2 className='card-title '>Courses</h2>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className=' text-warning'>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Chapters</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((course) => (
                          <CourseItem key={course.id} courseItem={course} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No courses found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link to={'/courseadd'} className='btn btn-warning my-1'>
                  Add Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourses })(Courses);
