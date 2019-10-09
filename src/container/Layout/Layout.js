import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Toolbar />
        {children}
      </div>
    );
  }
}

export default Layout;
