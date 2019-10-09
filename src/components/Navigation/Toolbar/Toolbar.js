import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

import classes from './Toolbar.module.css';

const toolbar = () => {
  return (
    <div className={classes.root}>
      <Logo />
      <NavigationItems />
    </div>
  );
};

export default toolbar;
