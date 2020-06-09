import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrainingPathStatus } from '../../../actions/trainingpath';

const DoneChapter = ({
  idChapter,
  idTrainingPath,
  addTrainingPathStatus,
  toggleModal,
  toggleLogProgress,
  userId,
}) => {
  const [formData, setFormData] = useState({
    dateFinished: '',
    chapterId: idChapter,
    trainingPathId: idTrainingPath,
    isActive: true,
  });

  const { dateFinished, chapterId, trainingPathId, isActive } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTrainingPathStatus(formData, userId);
    toggleModal();
    toggleLogProgress();
  };

  useEffect(() => {
    let dateToday = new Date();
    let strToday = moment(dateToday).format('YYYY-MM-DD');
    setFormData({ ...formData, dateFinished: strToday });
  }, []);

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-body'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='form-group'>
                        <label className='bmd-label-floating'>
                          Chapter Completed Date
                        </label>
                        <input
                          className='form-control'
                          type='date'
                          placeholder='Completed on'
                          name='dateFinished'
                          defaultValue={dateFinished}
                          value={dateFinished}
                          onChange={(e) => onChange(e)}
                          required
                        />
                      </div>{' '}
                    </div>
                  </div>
                  <input
                    type='submit'
                    className='btn btn-tenpearls'
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

DoneChapter.propTypes = {
  addTrainingPathStatus: PropTypes.func.isRequired,
};

export default connect(null, { addTrainingPathStatus })(DoneChapter);
