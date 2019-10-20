import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = ({ children, close }) =>
  ReactDOM.createPortal(
    <Fragment>
      <Backdrop clicked={close} />
      <div className={classes.root}>{children}</div>
    </Fragment>,
    document.getElementById('modal-root')
  );

export default modal;
