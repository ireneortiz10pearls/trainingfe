import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';

const MostEnrolledCourses = () => {
  const [datatable, setDatatable] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/trainingpath/mostenrolled/courses');
      setData(result.data.payload);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      setDatatable({
        columns: [
          {
            label: 'Course',
            field: 'Course.title',
            width: 150,
          },
          {
            label: 'QTY',
            field: 'courseCount',
            width: 150,
          },
        ],
        rows: data,
      });
    }
  }, [data]);

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

export default MostEnrolledCourses;
