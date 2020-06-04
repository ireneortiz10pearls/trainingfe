import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import {
  getUserCourses,
  deleteTrainingPath,
} from '../../../actions/trainingpath';
import CourseChapters from '../../coursechapter/table/CourseChapters';
import { Link } from 'react-router-dom';
import {
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

const TrainingPaths = ({
  auth: { user },
  getUserCourses,
  deleteTrainingPath,
  trainingpath: { trainingpaths, loading },
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
    const fetchUserCourses = async () => await getUserCourses(user.id);
    fetchUserCourses();
  }, [getUserCourses]);

  useEffect(() => {
    const courses = trainingpaths.map((trainingpath) => {
      const {
        id,
        Course: {
          title,
          Category: { name },
        },
      } = trainingpath;
      if (!trainingpath.hasOwnProperty('name')) {
        Object.defineProperty(trainingpath, 'name', {
          value: name,
        });
      } else {
        Object.assign(trainingpath, 'name', {
          value: name,
        });
      }
      if (!trainingpath.hasOwnProperty('title')) {
        Object.defineProperty(trainingpath, 'title', {
          value: title,
        });
      } else {
        Object.assign(trainingpath, 'title', {
          value: title,
        });
      }

      if (!trainingpath.hasOwnProperty('check')) {
        Object.defineProperty(trainingpath, 'check', {
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
        Object.assign(trainingpath, 'check', {
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

      if (!trainingpath.hasOwnProperty('action')) {
        return Object.defineProperty(trainingpath, 'action', {
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
        return Object.assign(trainingpath, 'action', {
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
          label: 'Course',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Chapters',
          field: 'action',
        },
      ],
      rows: courses,
    });
  }, [trainingpaths]);

  function confirmDelete() {
    if (
      window.confirm(
        'Are you sure to remove selected courses from your Training Path?'
      )
    ) {
      deleteTrainingPath(checked, user.id);
    } else {
      return;
    }
  }

  return loading && !trainingpaths ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Training Path</h3>
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
                <Link
                  to={'/availablecourses'}
                  className='btn btn-tenpearls my-1'
                >
                  Add TrainingPath
                </Link>
                <button
                  type='button'
                  className='btn btn-tenpearls my-1'
                  onClick={() => confirmDelete()}
                >
                  Remove selected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TrainingPaths.propTypes = {
  getUserCourses: PropTypes.func.isRequired,
  deleteTrainingPath: PropTypes.func.isRequired,
  trainingpath: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trainingpath: state.trainingpath,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserCourses, deleteTrainingPath })(
  TrainingPaths
);
