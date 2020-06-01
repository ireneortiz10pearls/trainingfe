import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import {
  getCourseChapters,
  deleteCourseChapter,
} from '../../../actions/coursechapter';

import { useHistory } from 'react-router-dom';
import CourseChapterEdit from '../forms/CourseChapterEdit';
import {
  MDBDataTableV5,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

const CourseChapters = ({
  courseId,
  getCourseChapters,
  deleteCourseChapter,
  courseChapter: { courseChapters, loading },
}) => {
  const [datatable, setDatatable] = useState({});
  let history = useHistory();

  const [editModal, togglesEditModal] = useState(false);
  const [chapterId, toggleChapter] = useState(0);

  const toggleEdit = (id) => {
    toggleChapter(() => id);
    togglesEditModal((prevModal) => !prevModal);
    return;
  };

  useEffect(() => {
    getCourseChapters(courseId);
  }, [getCourseChapters]);

  useEffect(() => {
    if (!loading && courseChapters) {
      const rows = courseChapters.map((chapter) => {
        const { id } = chapter;

        if (!chapter.hasOwnProperty('action')) {
          return Object.defineProperty(chapter, 'action', {
            value: (
              <Fragment>
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
                  onClick={() => toggleEdit(id)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        } else {
          return Object.assign(chapter, 'action', {
            value: (
              <Fragment>
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
                  onClick={() => toggleEdit(id)}
                >
                  Edit
                </button>
              </Fragment>
            ),
          });
        }
      });
      setDatatable({
        columns: [
          {
            label: 'Order',
            field: 'order',
            sort: 'asc',
            width: 150,
          },
          {
            label: 'Name',
            field: 'name',
            width: 150,
          },
          {
            label: 'Length',
            field: 'length',
            width: 150,
          },
          {
            label: 'Actions',
            field: 'action',
          },
        ],
        rows: rows,
      });
    }
  }, [courseChapters]);

  function confirmDelete(id, e) {
    e.preventDefault();
    if (window.confirm('Are you sure to delete Chapter?')) {
      deleteCourseChapter(id);
    } else {
      return;
    }
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
              {/* <div className='card-header card-header-warning'>
                <h4 className='card-title '>Chapters</h4>
              </div> */}
              <div className='card-body'>
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                />
                <MDBContainer>
                  <MDBModal isOpen={editModal} toggle={toggleEdit}>
                    <MDBModalHeader toggle={toggleEdit}>
                      Chapters
                    </MDBModalHeader>
                    <MDBModalBody>
                      <CourseChapterEdit
                        chapterId={chapterId}
                        toggleModal={toggleEdit}
                      />
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color='secondary' onClick={toggleEdit}>
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

CourseChapters.propTypes = {
  getCourseChapters: PropTypes.func.isRequired,
  deleteCourseChapter: PropTypes.func.isRequired,
  courseChapter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ courseChapter: state.courseChapter });

export default connect(mapStateToProps, {
  getCourseChapters,
  deleteCourseChapter,
})(CourseChapters);
