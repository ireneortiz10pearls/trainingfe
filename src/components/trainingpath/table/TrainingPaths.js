import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getUserCourses } from '../../../actions/trainingpath';
import { Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';

const TrainingPaths = ({
  auth: { user },
  getUserCourses,
  trainingpath: { trainingpaths, loading },
}) => {
  const [datatable, setDatatable] = useState({});

  useEffect(() => {
    const fetchUserCourses = async () => await getUserCourses(user.id);
    fetchUserCourses();
  }, [getUserCourses]);

  useEffect(() => {
    const courses = trainingpaths.map((trainingpath) =>
      Object.defineProperty(trainingpath.Course, 'action', {
        value: <button>Action</button>,
      })
    );
    setDatatable({
      columns: [
        {
          label: 'Course',
          field: 'title',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: courses,
    });
  }, [loading, trainingpaths]);

  return loading && !trainingpaths ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header card-header-warning'>
                <h3 className='card-title '>TrainingPaths</h3>
              </div>
              <div className='card-body'>
                <MDBDataTableV5
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                />
                <Link to={'/trainingpathadd'} className='btn btn-warning my-1'>
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
  getUserCourses: PropTypes.func.isRequired,
  trainingpath: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trainingpath: state.trainingpath,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserCourses })(TrainingPaths);
