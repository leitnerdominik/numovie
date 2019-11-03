import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SubNav.module.css';

const subNav = ({ items, activeId }) => {
  const linkItem = items
    .map(item => (
      <li key={item.id}>
        <Link
          to={item.path}
          style={{
            color: activeId === item.id ? '#e50914' : null,
          }}
        >
          {item.label}
        </Link>
      </li>
    ))
    .reduce((prev, curr) => [prev, '|', curr]);

  return (
    <div className={classes.root}>
      <ul className={classes.links}>{linkItem}</ul>
    </div>
  );
};

export default subNav;
