import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FinishedCourses = ({ trainingpath: { trainingpaths, loading } }) => {
  const [datatable, setDatatable] = useState({});

  useEffect(() => {
    if (trainingpaths) {
      const courses = trainingpaths.map((trainingpath) => {
        const {
          percentage,
          Course: { title },
        } = trainingpath;

        if (!trainingpath.hasOwnProperty('percentage')) {
          Object.defineProperty(trainingpath, 'percentage', {
            value: percentage,
          });
        } else {
          Object.assign(trainingpath, 'percentage', {
            value: percentage,
          });
        }

        if (!trainingpath.hasOwnProperty('title')) {
          return Object.defineProperty(trainingpath, 'title', {
            value: title,
          });
        } else {
          return Object.assign(trainingpath, 'title', {
            value: title,
          });
        }
      });
      const coursesFinished = courses.filter(
        (course) => course.percentage == 100
      );
      setDatatable({
        columns: [
          {
            label: 'Course',
            field: 'title',
          },
        ],
        rows: coursesFinished,
      });
    }
  }, [trainingpaths]);

  return (
    <Fragment>
      <MDBDataTableV5
        hover
        entriesOptions={[4]}
        entries={4}
        pagesAmount={4}
        data={datatable}
        searching={false}
      />
    </Fragment>
  );
};

FinishedCourses.propTypes = {
  trainingpath: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trainingpath: state.trainingpath,
});

export default connect(mapStateToProps, {})(FinishedCourses);
