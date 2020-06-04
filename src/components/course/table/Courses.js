import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getCourses, deleteCourse } from '../../../actions/course';
import { Link, useHistory } from 'react-router-dom';
import CourseChapters from '../../coursechapter/table/CourseChapters';
import CourseChapterAdd from '../../coursechapter/forms/CourseChapterAdd';
import {
  MDBDataTableV5,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

const Courses = ({
  getCourses,
  deleteCourse,
  course: { courses, loading },
}) => {
  const [datatable, setDatatable] = useState({});
  let history = useHistory();

  const [modal, toggleChapters] = useState(false);
  const [addModal, toggleAddChapter] = useState(false);
  const [courseId, toggleCourse] = useState(0);

  const toggle = (id) => {
    toggleCourse(() => id);
    toggleChapters((prevModal) => !prevModal);
    return;
  };

  const toggleAddModal = (id) => {
    toggleCourse(() => id);
    toggleAddChapter((prevAddModal) => !prevAddModal);
    return;
  };

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (!loading && courses) {
      const rows = courses.map((course) => {
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

        if (!course.hasOwnProperty('action')) {
          return Object.defineProperty(course, 'action', {
            value: (
              <Fragment>
                {' '}
                <button
                  type='button'
                  className='btn btn-tenpearls'
                  onClick={() => toggle(id)}
                >
                  Chapters
                </button>{' '}
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>{' '}
              </Fragment>
            ),
          });
        } else {
          return Object.assign(course, 'action', {
            value: (
              <Fragment>
                {' '}
                <button
                  type='button'
                  className='btn btn-tenpearls'
                  onClick={() => toggle(id)}
                >
                  Chapters
                </button>{' '}
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => confirmDelete(id, e)}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={(e) => handleEditClick(id, e)}
                >
                  Edit
                </button>{' '}
              </Fragment>
            ),
          });
        }
      });
      setDatatable({
        columns: [
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
            label: 'Actions',
            field: 'action',
          },
        ],
        rows: rows,
      });
    }
  }, [courses]);

  function confirmDelete(id, e) {
    e.preventDefault();
    if (window.confirm('Are you sure to delete course?')) {
      deleteCourse(id);
    } else {
      return;
    }
  }

  function handleEditClick(id, e) {
    e.preventDefault();
    history.push(`/courseedit/${id}`);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Courses</h3>
              </div>
              <div className='card-body'>
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                />
                <Link to={'/courseadd'} className='btn btn-tenpearls my-1'>
                  Add Course
                </Link>
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
                      <MDBBtn
                        color='warning'
                        onClick={() => toggleAddModal(courseId)}
                      >
                        Add Chapter
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>{' '}
                  <MDBModal isOpen={addModal} toggle={toggleAddModal}>
                    <MDBModalHeader toggle={toggleAddModal}>
                      Add Chapter
                    </MDBModalHeader>
                    <MDBModalBody>
                      <CourseChapterAdd
                        idCourse={courseId}
                        toggleModal={toggleAddModal}
                      />
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color='secondary' onClick={toggleAddModal}>
                        Close
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>{' '}
                </MDBContainer>
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
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ course: state.course });

export default connect(mapStateToProps, { getCourses, deleteCourse })(Courses);
