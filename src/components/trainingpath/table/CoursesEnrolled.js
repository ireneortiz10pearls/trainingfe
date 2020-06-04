import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';
import { getUserCourses } from '../../../actions/trainingpath';

const CoursesEnrolled = ({
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
    const courses = trainingpaths.map((trainingpath) => {
      const {
        id,
        Course: {
          title,
          Category: { name },
          CourseChapter,
        },
      } = trainingpath;
      return { title, name };
    });
    setDatatable({
      columns: [
        {
          label: 'Course',
          field: 'title',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Category',
          field: 'name',
          sort: 'asc',
          width: 150,
        },
      ],
      rows: courses,
    });
  }, [trainingpaths]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        searching={false}
      />
    </Fragment>
  );
};

CoursesEnrolled.propTypes = {
  getUserCourses: PropTypes.func.isRequired,
  trainingpath: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trainingpath: state.trainingpath,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserCourses,
})(CoursesEnrolled);
