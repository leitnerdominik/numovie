import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.css';

const backdrop = ({ clicked }) => {
  return ReactDOM.createPortal(
    <div className={classes.root} onClick={clicked}></div>,
    document.getElementById('backdrop-root')
  );
};

export default backdrop;
