import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBCol } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

const IndicatorCard = ({indicatorName, indicatorValue, indicatorIcon, indicatorColor}) => {
  return (
      <MDBCol xl='3' md='6' className='mb-r'>
        <MDBCard className='cascading-admin-card'>
          <div className='admin-up'>
            <MDBIcon icon={indicatorIcon} className={indicatorColor}/>
            <div className='data'>
              <p>{indicatorName}</p>
              <h4>
                <strong>{indicatorValue}</strong>
              </h4>
            </div>
          </div>
          <MDBCardBody></MDBCardBody>
        </MDBCard>
      </MDBCol>
  );
}

export default IndicatorCard;

