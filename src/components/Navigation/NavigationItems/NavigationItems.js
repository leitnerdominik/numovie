import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = ({navItems}) => {
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