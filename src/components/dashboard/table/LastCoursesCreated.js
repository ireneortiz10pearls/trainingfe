import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import moment from 'moment';

const LastCoursesCreated = () => {
  const [datatable, setDatatable] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/course/lastcreated');
      setData(result.data.payload);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const courses = data.map((item) => {
        const { title, createdAt } = item;
        let dateCreated = new Date(createdAt);
        let strCreatedAt = moment(dateCreated).format('YYYY-MM-DD');
        return { title, strCreatedAt };
      });

      setDatatable({
        columns: [
          {
            label: 'Course',
            field: 'title',
          },
          {
            label: 'Created on',
            field: 'strCreatedAt',
          },
        ],
        rows: courses,
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

export default LastCoursesCreated;
