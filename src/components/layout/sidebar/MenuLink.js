import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function MenuLink({ label, icon, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  let linkClass = 'nav-item active';

  return (
    <li className={match ? 'nav-item active' : 'nav-item '}>
      <Link to={to} className='nav-link'>
        <i className='material-icons'>{icon}</i>
        <p>{label}</p>
      </Link>
    </li>
  );
}

export default MenuLink;
