import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.module.css';

const logo = () => {
  return (
    <div className={classes.root}>
      <h2 className={classes.title}><Link to="/">Numovie</Link></h2>
    </div>
  );
};

export default logo;
