import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getTrainingPaths } from '../../../actions/trainingPath';
import TrainingPathItem from './TrainingPathItem';
import { Link } from 'react-router-dom';

const TrainingPaths = ({
  getTrainingPaths,
  trainingPath: { trainingPaths, loading },
}) => {
  useEffect(() => {
    getTrainingPaths(userId);
  }, [getTrainingPaths]);

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
                <h2 className='card-title '>TrainingPaths</h2>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead className=' text-warning'>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      {/* <th>Active</th> */}
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {trainingPaths.length > 0 ? (
                        trainingPaths.map((trainingPath) => (
                          <TrainingPathItem
                            key={trainingPath.id}
                            trainingPathItem={trainingPath}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No trainingPaths found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link to={'/trainingPathadd'} className='btn btn-warning my-1'>
                  Add TrainingPath
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TrainingPaths.propTypes = {
  getTrainingPaths: PropTypes.func.isRequired,
  trainingPath: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ trainingPath: state.trainingPath });

export default connect(mapStateToProps, { getTrainingPaths })(TrainingPaths);
