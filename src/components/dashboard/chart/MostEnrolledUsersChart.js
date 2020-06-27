import React, { Fragment, useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import axios from 'axios';

const MostEnrolledUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/trainingpath/mostenrolled/users');
      setData(result.data.payload);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={230}
      >
        <VictoryBar
          style={{ data: { fill: '#4caf50' } }}
          data={data}
          x='fullName'
          y={(d) => Number(d.userCount)}
        />
        <VictoryAxis
          label='Users'
          style={{
            axisLabel: { padding: 30 },
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label='Courses enrolled'
          style={{
            axisLabel: { padding: 30 },
          }}
        />
      </VictoryChart>
    </Fragment>
  );
};

export default MostEnrolledUsers;
