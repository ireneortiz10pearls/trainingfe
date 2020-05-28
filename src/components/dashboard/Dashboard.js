import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({ auth: { isAuthenticated, loading, user } }) => {
  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h2 className='card-title '>Dashboard</h2>
              </div>
              <div className='card-body'>
                {isAuthenticated && !loading && user.roleId === 1 && (
                  <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-6'>
                      <div className='card card-stats'>
                        <div className='card-header card-header-warning card-header-icon'>
                          <div className='card-icon'>
                            <i className='material-icons'>group</i>
                          </div>
                          <p className='card-category'>Active Members</p>
                          <h3 className='card-title'>
                            595
                            <small></small>
                          </h3>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6'>
                      <div className='card card-stats'>
                        <div className='card-header card-header-success card-header-icon'>
                          <div className='card-icon'>
                            <i className='material-icons'>menu_book</i>
                          </div>
                          <p className='card-category'>Active Courses</p>
                          <h3 className='card-title'>367</h3>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>date_range</i> Last 24
                            Hours
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6'>
                      <div className='card card-stats'>
                        <div className='card-header card-header-danger card-header-icon'>
                          <div className='card-icon'>
                            <i className='material-icons'>info_outline</i>
                          </div>
                          <p className='card-category'>Total Lecture Hours</p>
                          <h3 className='card-title'>75,890</h3>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>access_time</i>{' '}
                            updated 4 minutes ago
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6'>
                      <div className='card card-stats'>
                        <div className='card-header card-header-info card-header-icon'>
                          <div className='card-icon'>
                            <i className='material-icons'>input</i>
                          </div>
                          <p className='card-category'>New Members</p>
                          <h3 className='card-title'>13</h3>
                        </div>
                        <div className='card-footer'>
                          <div className='stats'>
                            <i className='material-icons'>date_range</i> Last 24
                            Hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className='row'>
                  <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className='card card-stats'>
                      <div className='card-header card-header-info card-header-icon'>
                        <div className='card-icon'>
                          <i className='material-icons'>bookmarks</i>
                        </div>
                        <p className='card-category'>Most Active Category</p>
                        <p />
                        <h3 className='card-title'>
                          Javascript
                          <small></small>
                        </h3>
                      </div>
                      <div className='card-footer'>
                        <div className='stats'>
                          <i className='material-icons'>access_time</i> updated
                          4 minutes ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className='card card-stats'>
                      <div className='card-header card-header-danger card-header-icon'>
                        <div className='card-icon'>
                          <i className='material-icons'>label</i>
                        </div>
                        <p className='card-category'>Most Active Tag</p>
                        <h3 className='card-title'>React</h3>
                      </div>
                      <div className='card-footer'>
                        <div className='stats'>
                          <i className='material-icons'>date_range</i> Last 24
                          Hours
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className='card card-stats'>
                      <div className='card-header card-header-success card-header-icon'>
                        <div className='card-icon'>
                          <i className='material-icons'>info_outline</i>
                        </div>
                        <p className='card-category'>Last Attended Course</p>
                        <h3 className='card-title'>React</h3>
                      </div>
                      <div className='card-footer'>
                        <div className='stats'>
                          <i className='material-icons'>access_time</i> updated
                          4 minutes ago
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6'>
                    <div className='card card-stats'>
                      <div className='card-header card-header-warning card-header-icon'>
                        <div className='card-icon'>
                          <i className='material-icons'>input</i>
                        </div>
                        <p className='card-category'>Chapters Left</p>
                        <h3 className='card-title'>13</h3>
                      </div>
                      <div className='card-footer'>
                        <div className='stats'>
                          <i className='material-icons'>date_range</i> Last 24
                          Hours
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <div className='card-header card-header-warning'>
                          <div className='ct-chart'>
                            Your courses without starting
                          </div>
                        </div>
                        <div className='card-body'>
                          <table className='table table-hover'>
                            <thead className='text-warning'>
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
                          <h4 class='card-title'>No movement in last month</h4>
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
                {isAuthenticated && !loading && user.roleId === 2 && (
                  <div className='row'>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-warning'>
                          <h4 className='card-title'>Courses Started</h4>
                          <p className='card-category'></p>
                        </div>
                        <div className='card-body table-responsive'>
                          <table className='table table-hover'>
                            <thead className='text-warning'>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Percentage Completed %</th>
                              <th>Chapters Left</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>50</td>
                                <td>13</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>89</td>
                                <td>7</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>23</td>
                                <td>35</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Philip Chaney</td>
                                <td>34</td>
                                <td>56</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-success'>
                          <h4 className='card-title'>Courses Enrolled</h4>
                          <p className='card-category'></p>
                        </div>
                        <div className='card-body table-responsive'>
                          <table className='table table-hover'>
                            <thead className='text-success'>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Duration (Min)</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>123</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Dakota Rice</td>
                                <td>123</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>321</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Philip Chaney</td>
                                <td>343</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className='row'>
                  <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                      <div className='card-header card-header-danger'>
                        <h4 className='card-title'>Most enrolled courses</h4>
                        <p className='card-category'>Last Month</p>
                      </div>
                      <div className='card-body table-responsive'>
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
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='card'>
                      <div className='card-header card-header-warning'>
                        <h4 className='card-title'>Last Courses Added</h4>
                        <p className='card-category'>This Week</p>
                      </div>
                      <div className='card-body table-responsive'>
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
                      </div>
                    </div>
                  </div>
                </div>
                {isAuthenticated && !loading && user.roleId === 1 && (
                  <div className='row'>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-success'>
                          <h4 className='card-title'>
                            Members Enrolled in More Courses
                          </h4>
                          <p className='card-category'></p>
                        </div>
                        <div className='card-body table-responsive'>
                          <table className='table table-hover'>
                            <thead className='text-success'>
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
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                      <div className='card'>
                        <div className='card-header card-header-warning'>
                          <h4 className='card-title'>Most Active Members</h4>
                          <p className='card-category'>This Month</p>
                        </div>
                        <div className='card-body table-responsive'>
                          <table className='table table-hover'>
                            <thead className='text-warning'>
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
                        </div>
                      </div>
                    </div>
                  </div>
                )}{' '}
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
