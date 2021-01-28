import React, { useEffect, useState } from 'react';
import { MDBRow } from 'mdbreact';
import IndicatorCard from './indicatorcard'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const IndicatorsSection = ({ trainingpath: { trainingpaths, loading },}) => {
  const [enrolledCourses, setEnrolledCourses] = useState(0);
  const [notStartedCourses, setNotStartedCourses] = useState(0);
  const [finishedCourses, setFinishedCourses] = useState(0);
  const [startedCourses, setStartedCourses] = useState(0);
  useEffect(() => {
    if (trainingpaths) {
        const courses = trainingpaths.map((trainingpath) => {
            const {
                percentage,
            } = trainingpath;
            
            if (!trainingpath.hasOwnProperty('percentage')) {
                return Object.defineProperty(trainingpath, 'percentage', {
                  value: percentage,
                });
              } else {
                return Object.assign(trainingpath, 'percentage', {
                  value: percentage,
                });
              }

          });
      const coursesNotStarted = courses.filter((course) => course.percentage == 0);
      setNotStartedCourses(coursesNotStarted.length);
      setEnrolledCourses(courses.length);
      const coursesFinished = courses.filter((course) => course.percentage == 100);
      setFinishedCourses(coursesFinished.length);
      const coursesStarted = courses.filter((course) => course.percentage < 100 && course.percentage > 0);
      setStartedCourses(coursesStarted.length);
    }
  }, [trainingpaths]);
  return (
    <MDBRow>
      <IndicatorCard
        indicatorName='Courses Enrolled'
        indicatorValue={enrolledCourses}
        indicatorIcon='book'
        indicatorColor='warning-color'
      />
      <IndicatorCard
        indicatorName='Courses Finished'
        indicatorValue={finishedCourses}
        indicatorIcon='trophy'
        indicatorColor='primary-color'
      />
      <IndicatorCard
        indicatorName='Courses Started'
        indicatorValue={startedCourses}
        indicatorIcon='thumbs-up'
        indicatorColor='light-blue lighten-1'
      />
      <IndicatorCard
        indicatorName='Not Started'
        indicatorValue={notStartedCourses}
        indicatorIcon='warning'
        indicatorColor='red accent-2'
      />
    </MDBRow>
  );
}
IndicatorsSection.propTypes = {
  trainingpath: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  trainingpath: state.trainingpath,
});

export default connect(mapStateToProps, {  })(IndicatorsSection);

