import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import MenuLink from './MenuLink';
import logo from '../../../img/logo.png';

const Sidebar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul className='nav'>
      <MenuLink
        activeOnlyWhenExact={true}
        to='/dashboard'
        label='Dashboard'
        icon='dashboard'
      />
      {isAuthenticated && !loading && user.roleId === 1 && (
        <Fragment>
          <MenuLink
            activeOnlyWhenExact={true}
            to='/users'
            label='Members'
            icon='group'
          />
          <MenuLink
            activeOnlyWhenExact={true}
            to='/categories'
            label='Categories'
            icon='bookmarks'
          />
          <MenuLink
            activeOnlyWhenExact={true}
            to='/courses'
            label='Courses'
            icon='menu_book'
          />
        </Fragment>
      )}
      {isAuthenticated && !loading && user.roleId === 2 && (
        <Fragment>
          <MenuLink
            activeOnlyWhenExact={true}
            to='/#'
            label='Training Path'
            icon='school'
          />
          <MenuLink
            activeOnlyWhenExact={true}
            to='/#'
            label='Log Progress'
            icon='trending_up'
          />
        </Fragment>
      )}
      <li className='nav-item '>
        <a className='nav-link' onClick={logout} href='#!'>
          <i className='material-icons'>settings_power</i>
          <p>Logout</p>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='nav'>
      <MenuLink
        activeOnlyWhenExact={true}
        to='/login'
        label='Login'
        icon='fingerprint'
      />
    </ul>
  );
  return (
    <Fragment>
      <div
        className='sidebar'
        data-color='orange'
        data-background-color='white'
      >
        <div className='logo'>
          <img
            src={logo}
            style={{ width: '180px', margin: 'auto', display: 'block' }}
            alt='10 Pearls'
          />
          <a href='' className='simple-text'>
            Training Tracking
          </a>
        </div>
        <div className='user'>
          <p className='simple-text'>
            <i className='material-icons'>face</i>{' '}
            {isAuthenticated && !loading
              ? `${user.firstName}  ${user.lastName}`
              : 'Guest'}
          </p>
        </div>
        <div className='sidebar-wrapper'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
