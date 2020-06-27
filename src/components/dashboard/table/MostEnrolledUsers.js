import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';

const MostEnrolledUsers = () => {
  const [datatable, setDatatable] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/trainingpath/mostenrolled/users');
      setData(result.data.payload);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setDatatable({
        columns: [
          {
            label: 'User',
            field: 'fullName',
          },
          {
            label: 'Quantity',
            field: 'userCount',
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

export default MostEnrolledUsers;
