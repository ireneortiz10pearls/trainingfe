import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrainingPaths from '../trainingpath/table/TrainingPaths';
import MostEnrolledCourses from './table/MostEnrolledCourses';
import MostEnrolledUsers from './table/MostEnrolledUsers';
import MostEnrolledUsersChart from './chart/MostEnrolledUsersChart';
import LastCoursesCreated from './table/LastCoursesCreated';
import { useHistory } from 'react-router-dom';

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
                        <p className='card-category'>Last Month</p>
                      </div>
                      <MostEnrolledCourses />
                      {/* <div className='card-body table-responsive'>
                        <table className='table table-hover'>
                          <thead className='text-danger'>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Country</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Dakota Rice</td>
                              <td>$36,738</td>
                              <td>Niger</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Minerva Hooper</td>
                              <td>$23,789</td>
                              <td>Curaçao</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Sage Rodriguez</td>
                              <td>$56,142</td>
                              <td>Netherlands</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Philip Chaney</td>
                              <td>$38,735</td>
                              <td>Korea, South</td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                      <div className='card-header card-header-tenpearls'>
                        <h4 className='card-title'>Last Courses Added</h4>
                        <p className='card-category'>This Week</p>
                      </div>
                      <LastCoursesCreated />
                      {/* <div className='card-body table-responsive'>
                        <table className='table table-hover'>
                          <thead className='text-primary'>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Country</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Dakota Rice</td>
                              <td>$36,738</td>
                              <td>Niger</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Minerva Hooper</td>
                              <td>$23,789</td>
                              <td>Curaçao</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Sage Rodriguez</td>
                              <td>$56,142</td>
                              <td>Netherlands</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Philip Chaney</td>
                              <td>$38,735</td>
                              <td>Korea, South</td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
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
                          <p className='card-category'>This Month</p>
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
                          <div className='ct-chart'>Recomended Courses</div>
                        </div>
                        <div className='card-body'>
                          <table className='table table-hover'>
                            <thead className='text-success'>
                              <th>Name</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Dakota Rice</td>
                              </tr>
                              <tr>
                                <td>Minerva Hooper</td>
                              </tr>
                              <tr>
                                <td>Sage Rodriguez</td>
                              </tr>
                              <tr>
                                <td>Philip Chaney</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div>
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
                        <div className='card-body'>
                          <table className='table table-hover'>
                            <thead className='text-tenpearls'>
                              <th>Name</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Dakota Rice</td>
                              </tr>
                              <tr>
                                <td>Minerva Hooper</td>
                              </tr>
                              <tr>
                                <td>Sage Rodriguez</td>
                              </tr>
                              <tr>
                                <td>Philip Chaney</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='card '>
                        <div className='card-header card-header-danger'>
                          <div className='ct-chart'>Your courses stopped</div>
                        </div>
                        <div className='card-body'>
                          <h4 className='card-title'>
                            No movement in last month
                          </h4>
                          <table className='table table-hover'>
                            <thead className='text-danger'>
                              <th>Name</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Dakota Rice</td>
                              </tr>
                              <tr>
                                <td>Minerva Hooper</td>
                              </tr>
                              <tr>
                                <td>Sage Rodriguez</td>
                              </tr>
                              <tr>
                                <td>Philip Chaney</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div>
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
