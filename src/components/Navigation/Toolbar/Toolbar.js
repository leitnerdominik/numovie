import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import SearchBox from '../../SearchBox/SearchBox';

import classes from './Toolbar.module.css';

const navItems = [
  {
    label: 'Movies',
    path: '/',
    id: 1,
  },
  {
    label: 'Series',
    path: '/series',
    id: 2,
  },
];

const toolbar = () => {
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <Logo />
        <NavigationItems navItems={navItems} />
      </div>
      <SearchBox />
    </div>
  );
};

export default toolbar;
