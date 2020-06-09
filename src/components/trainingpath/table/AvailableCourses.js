import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import {
  getAvailableCourses,
  addUserCourses,
} from '../../../actions/trainingpath';
import CourseChapters from '../../coursechapter/table/CourseChapters';
import {
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import { withRouter } from 'react-router-dom';

const AvailableCourses = ({
  addUserCourses,
  getAvailableCourses,
  course: { courses, loading },
  auth: { user },
  history,
}) => {
  const [checked, setChecked] = useState([]);

  const toggleCheck = (e) => {
    e.persist();
    setChecked((prevChecked) => {
      if (prevChecked.filter((name) => name === e.target.id)[0]) {
        return prevChecked.filter((name) => name !== e.target.id);
      } else {
        return [...prevChecked, e.target.id];
      }
    });
  };

  const isChecked = (id) => {
    return checked.filter((name) => name === id)[0] ? true : false;
  };

  const [datatable, setDatatable] = useState({});

  const [modal, toggleChapters] = useState(false);
  const [courseId, toggleCourse] = useState(0);

  const toggle = (id) => {
    toggleCourse(() => id);
    toggleChapters((prevModal) => !prevModal);
    return;
  };

  useEffect(() => {
    if (user) {
      getAvailableCourses(user.id);
    }
  }, [getAvailableCourses, user]);

  useEffect(() => {
    if (!loading && courses) {
      const rows = courses.map((course, index) => {
        const {
          id,
          Category: { name },
        } = course;
        if (!course.hasOwnProperty('name')) {
          Object.defineProperty(course, 'name', {
            value: name,
          });
        } else {
          Object.assign(course, 'name', {
            value: name,
          });
        }

        if (!course.hasOwnProperty('check')) {
          Object.defineProperty(course, 'check', {
            value: (
              <Fragment>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      defaultChecked={isChecked(`${id}`)}
                      type='checkbox'
                      id={`${id}`}
                      onChange={(e) => toggleCheck(e)}
                    />
                    <span className='form-check-sign'>
                      <span className='check'></span>
                    </span>
                  </label>
                </div>
              </Fragment>
            ),
          });
        } else {
          Object.assign(course, 'check', {
            value: (
              <Fragment>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      defaultChecked={isChecked(`${id}`)}
                      type='checkbox'
                      id={`${id}`}
                      onChange={(e) => toggleCheck(e)}
                    />
                    <span className='form-check-sign'>
                      <span className='check'></span>
                    </span>
                  </label>
                </div>
              </Fragment>
            ),
          });
        }

        if (!course.hasOwnProperty('action')) {
          return Object.defineProperty(course, 'action', {
            value: (
              <button
                type='button'
                className='btn btn-tenpearls'
                onClick={() => toggle(id)}
              >
                Chapters
              </button>
            ),
          });
        } else {
          return Object.assign(course, 'action', {
            value: (
              <button
                type='button'
                className='btn btn-tenpearls'
                onClick={() => toggle(id)}
              >
                Chapters
              </button>
            ),
          });
        }
      });
      setDatatable({
        columns: [
          {
            label: ' ',
            field: 'check',
            sort: 'asc',
          },
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
          },
          {
            label: 'Title',
            field: 'title',
          },
          {
            label: 'Category',
            field: 'name',
          },
          {
            label: 'Chapters',
            field: 'action',
          },
        ],
        rows: rows,
      });
    }
  }, [courses]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (checked.length > 0) {
      addUserCourses(checked, user.id, history);
    } else {
      alert('Please select at least one course to add.');
    }
  };

  return loading && !courses ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header card-header-tenpearls'>
                  <h3 className='card-title '>
                    Add courses to your training path
                  </h3>
                </div>
                <div className='card-body'>
                  <MDBDataTable
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={datatable}
                    paging={false}
                    scrollY={true}
                    maxHeight='59vh'
                  />
                  <MDBContainer>
                    <MDBModal isOpen={modal} toggle={toggle} size='lg'>
                      <MDBModalHeader toggle={toggle}>Chapters</MDBModalHeader>
                      <MDBModalBody>
                        <CourseChapters courseId={courseId} />
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggle}>
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>{' '}
                  </MDBContainer>
                  <input
                    type='submit'
                    className='btn btn-tenpearls'
                    value='Save'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AvailableCourses.propTypes = {
  getAvailableCourses: PropTypes.func.isRequired,
  addUserCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ course: state.course, auth: state.auth });

export default connect(mapStateToProps, {
  getAvailableCourses,
  addUserCourses,
})(withRouter(AvailableCourses));
