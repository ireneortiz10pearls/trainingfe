import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import moment from 'moment';
import {
  getUserChapters,
  editTrainingPathStatus,
  addBatchTrainingPathStatus,
} from '../../../actions/trainingpath';
import DoneChapter from '../../trainingpath/forms/DoneChapter';
import EditDone from '../../trainingpath/forms/EditDone';
import {
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

const LogProgress = ({
  trainingPathId,
  courseId,
  getUserChapters,
  editTrainingPathStatus,
  addBatchTrainingPathStatus,
  courseChapter: { courseChapters, loading },
  auth: { user },
  toggleLogProgress,
}) => {
  const [checked, setChecked] = useState([]);
  const [areAllChecked, setAreAllChecked] = useState(false);

  const checkAllHandler = (e) => {
    e.persist();

    if (e.target.checked) {
      console.log('checked');
      courseChapters.map((chapter) => {
        const { id } = chapter;
        setChecked((prevChecked) => {
          return [...prevChecked, id];
        });
      });
      setAreAllChecked(true);
    } else {
      console.log('unchecked');
      setChecked(() => {
        return [];
      });
      setAreAllChecked(false);
    }
  };

  const toggleCheck = (e) => {
    e.persist();
    setChecked((prevChecked) => {
      if (prevChecked.filter((name) => name === e.target.id)[0]) {
        return prevChecked.filter((name) => name !== e.target.id);
      } else {
        return [...prevChecked, Number(e.target.id)];
      }
    });
  };

  const isChecked = (id) => {
    return checked.filter((name) => name === id)[0] ? true : false;
  };

  const [datatable, setDatatable] = useState({});

  const [editModal, togglesEditModal] = useState(false);
  const [chapterId, toggleChapter] = useState(0);
  const [dateFinished, setDateFinished] = useState('');
  const [operation, setOperation] = useState('');

  const toggleEdit = (id, op, finishedDate) => {
    toggleChapter(() => id);
    togglesEditModal((prevModal) => !prevModal);
    setOperation(() => op);
    if (op === 'edit') {
      setDateFinished(() => finishedDate);
    }

    return;
  };

  useEffect(() => {
    if (user) {
      getUserChapters(trainingPathId, courseId, user.id);
    }
  }, [getUserChapters, user]);

  useEffect(() => {
    if (!loading && courseChapters) {
      let total = courseChapters.reduce(
        function (acumulator, nextValue) {
          return {
            length: acumulator.length + nextValue.length,
          };
        },
        { length: 0 }
      );
      const rows = courseChapters.map((chapter) => {
        const { id, length, isDone, dateFinished } = chapter;
        let value = (length / total.length) * 100;
        value = value.toFixed(2);
        if (!chapter.hasOwnProperty('_percentage')) {
          Object.defineProperty(chapter, '_percentage', {
            value: value,
          });
        } else {
          Object.assign(chapter, '_percentage', {
            value: value,
          });
        }
        if (!chapter.hasOwnProperty('dateFinished')) {
          Object.defineProperty(chapter, 'dateFinished', {
            value: dateFinished,
          });
        } else {
          Object.assign(chapter, 'dateFinished', {
            value: dateFinished,
          });
        }
        if (!chapter.hasOwnProperty('check')) {
          Object.defineProperty(chapter, 'check', {
            value: (
              <Fragment>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      defaultChecked={areAllChecked ? true : isChecked(`${id}`)}
                      disabled={isDone}
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
          Object.assign(chapter, 'check', {
            value: (
              <Fragment>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      defaultChecked={areAllChecked ? true : isChecked(`${id}`)}
                      disabled={isDone}
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

        if (user.roleId === 2) {
          if (!chapter.hasOwnProperty('action')) {
            return Object.defineProperty(chapter, 'action', {
              value: (
                <Fragment>
                  <div style={{ display: !isDone ? 'block' : 'none' }}>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={() => toggleEdit(id, 'add')}
                    >
                      Done
                    </button>
                  </div>
                  <div style={{ display: isDone ? 'block' : 'none' }}>
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() => toggleEdit(id, 'edit', dateFinished)}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={(e) => markUndo(id, dateFinished, e)}
                    >
                      Undo
                    </button>
                  </div>
                </Fragment>
              ),
            });
          } else {
            return Object.assign(chapter, 'action', {
              value: (
                <Fragment>
                  <div style={{ display: !isDone ? 'block' : 'none' }}>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={() => toggleEdit(id, 'add')}
                    >
                      Done
                    </button>
                  </div>
                  <div style={{ display: isDone ? 'block' : 'none' }}>
                    <button
                      type='button'
                      className='btn btn-info'
                      onClick={() => toggleEdit(id, 'edit', dateFinished)}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={(e) => markUndo(id, dateFinished, e)}
                    >
                      Undo
                    </button>
                  </div>
                </Fragment>
              ),
            });
          }
        } else {
          if (!chapter.hasOwnProperty('action')) {
            return Object.defineProperty(chapter, 'action', {
              value: '',
            });
          } else {
            return Object.assign(chapter, 'action', {
              value: '',
            });
          }
        }
      });
      setDatatable({
        columns: [
          {
            label: (
              <Fragment>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox0'
                      onChange={(e) => checkAllHandler(e)}
                    />
                    <span className='form-check-sign'>
                      <span className='check'></span>
                    </span>
                  </label>
                </div>
              </Fragment>
            ),
            field: 'check',
            sort: 'asc',
          },
          {
            label: 'Order',
            field: 'order',
            sort: 'asc',
          },
          {
            label: 'Name',
            field: 'name',
            width: 300,
          },
          {
            label: '(min)',
            field: 'length',
          },
          {
            label: '(%)',
            field: '_percentage',
            width: 100,
          },
          {
            label: 'Finished on',
            field: 'dateFinished',
            width: 300,
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

  function markUndo(id, finishedDate, e) {
    e.preventDefault();
    if (window.confirm('Are you sure to undo chapter from progress?')) {
      const isActive = false;
      let dateToday = new Date(finishedDate);
      let dateFinished = moment(dateToday).format('YYYY-MM-DD');
      let chapterId = id;
      editTrainingPathStatus(
        {
          dateFinished,
          chapterId,
          trainingPathId,
          isActive,
        },
        user.id
      );
      toggleEdit();
      toggleLogProgress();
    } else {
      return;
    }
  }

  function batchMark() {
    if (checked.length > 0) {
      const isActive = true;
      let dateToday = new Date();
      let dateFinished = moment(dateToday).format('YYYY-MM-DD');
      addBatchTrainingPathStatus(
        checked,
        {
          dateFinished,
          chapterId,
          trainingPathId,
          isActive,
        },
        user.id
      );
      toggleEdit();
      toggleLogProgress();
    } else {
      alert('Please select at least one chapter to mark.');
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
              <div className='card-body'>
                <MDBDataTable
                  hover
                  data={datatable}
                  paging={false}
                  scrollY={true}
                  maxHeight='50vh'
                  sortable={false}
                />
                <MDBContainer>
                  <MDBModal isOpen={editModal} toggle={toggleEdit}>
                    <MDBModalHeader toggle={toggleEdit}>
                      Chapters
                    </MDBModalHeader>
                    <MDBModalBody>
                      {operation === 'add' || operation === 'batch' ? (
                        <DoneChapter
                          idTrainingPath={trainingPathId}
                          idChapter={chapterId}
                          toggleModal={toggleEdit}
                          toggleLogProgress={toggleLogProgress}
                          userId={user.id}
                        />
                      ) : (
                        <EditDone
                          idTrainingPath={trainingPathId}
                          idChapter={chapterId}
                          toggleModal={toggleEdit}
                          toggleLogProgress={toggleLogProgress}
                          finishedDate={dateFinished}
                        />
                      )}
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
            <button
              type='button'
              className='btn btn-tenpearls my-1'
              onClick={() => batchMark()}
            >
              Mark done selected
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LogProgress.propTypes = {
  getUserChapters: PropTypes.func.isRequired,
  editTrainingPathStatus: PropTypes.func.isRequired,
  addBatchTrainingPathStatus: PropTypes.func.isRequired,
  courseChapter: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  courseChapter: state.courseChapter,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserChapters,
  editTrainingPathStatus,
  addBatchTrainingPathStatus,
})(LogProgress);
