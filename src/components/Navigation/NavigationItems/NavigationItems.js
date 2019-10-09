import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navItems = [
  {
    label: 'Home',
    path: '/',
    id: 1,
  },
  {
    label: 'Series',
    path: '/series',
    id: 2,
  },
  {
    label: 'Movies',
    path: '/movies',
    id: 3,
  },
];

const navigationItems = () => {
  const items = navItems.map(item => (
    <NavigationItem key={item.id} path={item.path}>
      {item.label}
    </NavigationItem>
  ));
  return (
    <nav>
      <ul className={classes.list}>
        {items}
      </ul>
    </nav>
  );
};

export default navigationItems;