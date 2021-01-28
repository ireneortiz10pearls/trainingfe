import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrainingPaths from '../trainingpath/table/TrainingPaths';
import MostEnrolledCourses from './table/MostEnrolledCourses';
import MostEnrolledUsers from './table/MostEnrolledUsers';
import MostEnrolledUsersChart from './chart/MostEnrolledUsersChart';
import LastCoursesCreated from './table/LastCoursesCreated';
import { useHistory } from 'react-router-dom';
import RecomendedCourses from './table/RecomendedCourses';
import NotStartedCourses from './table/NotStartedCourses';
import IndicatorsSection from './indicator/indicatorssection';
import FinishedCourses from './table/FinishedCourses';

const Dashboard = ({ auth: { isAuthenticated, loading, user } }) => {
  let history = useHistory();
  function addCourseClick() {
    history.push('/availablecourses');
  }

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-tenpearls'>
                <h3 className='card-title '>Dashboard</h3>
              </div>
              <div className='card-body'>
                {isAuthenticated && !loading && user.roleId === 2 && (
                  <Fragment>
                    <div>
                      <IndicatorsSection />
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12'>
                        <div className='card-body'>
                          <TrainingPaths />
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </Fragment>
                )}
                <div className='row'>
                  <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                      <div className='card-header card-header-tenpearls'>
                        <h4 className='card-title'>Most enrolled courses</h4>
                        {/* <p className='card-category'>Last Month</p> */}
                      </div>
                      <MostEnrolledCourses />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                      <div className='card-header card-header-tenpearls'>
                        <h4 className='card-title'>Last Courses Added</h4>
                        {/* <p className='card-category'>This Week</p> */}
                      </div>
                      <LastCoursesCreated />
                    </div>
                  </div>
                </div>
                {isAuthenticated && !loading && user.roleId === 1 && (
                  <div className='row'>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-tenpearls'>
                          <h4 className='card-title'>
                            Members Enrolled in More Courses
                          </h4>
                          <p className='card-category'></p>
                        </div>
                        <MostEnrolledUsers />
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-tenpearls'>
                          <h4 className='card-title'>Most Active Members</h4>
                          {/* <p className='card-category'></p> */}
                        </div>
                        <MostEnrolledUsersChart />{' '}
                      </div>
                    </div>
                  </div>
                )}{' '}
                {isAuthenticated && !loading && user.roleId === 2 && (
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='card '>
                        <div className='card-header card-header-success'>
                          <div className='ct-chart'>Finished Courses</div>
                        </div>
                        <FinishedCourses />
                        <div className='card-footer'>
                          {/* <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='card '>
                        <div className='card-header card-header-tenpearls'>
                          <div className='ct-chart'>
                            Your courses without starting
                          </div>
                        </div>
                        <NotStartedCourses />{' '}
                        <div className='card-footer'>
                          {/* <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='card '>
                        <div className='card-header card-header-danger'>
                          <div className='ct-chart'>Recomended Courses</div>
                        </div>
                        <div className='card-body'>
                          {/* <h4 className='card-title'>
                            No movement in last month
                          </h4> */}
                          <RecomendedCourses />
                        </div>
                        <div className='card-footer'>
                          {/* <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
