import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = ({ path, children }) => {
  return (
    <li className={classes.root}>
      <Link className={classes.link} to={path}>{children}</Link>
    </li>
  );
};

navigationItem.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default navigationItem;
