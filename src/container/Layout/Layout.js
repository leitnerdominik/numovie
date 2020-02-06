import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className={classes.navBar}>
          <Toolbar />
        </div>
        {children}
      </div>
    );
  }
}

export default Layout;
