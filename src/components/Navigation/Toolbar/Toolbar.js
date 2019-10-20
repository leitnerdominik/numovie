import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import SearchBox from '../../SearchBox/SearchBox';

import classes from './Toolbar.module.css';

const toolbar = () => {
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <Logo />
        <NavigationItems />
      </div>
      <SearchBox />
    </div>
  );
};

export default toolbar;
