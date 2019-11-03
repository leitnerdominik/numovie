import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Paginator.module.css';

const paginator = ({ currentPage, clicked, totalPages }) => {
  const pages = [];
  for (let i = currentPage - 2; i < currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) pages.push(i);
  }

  const showPages = pages.map((p, i) => (
    <span
      key={i}
      className={
        p === currentPage
          ? [classes.pages, classes.activePage].join(' ')
          : classes.pages
      }
      onClick={clicked}
    >
      <Link to={`?page=${p}`}>{p}</Link>
    </span>
  ));

  return (
    <div className={classes.root}>
      {currentPage > 1 && (
        <button onClick={clicked} className={classes.controlBtn}>
          <Link to={`?page=${+currentPage - 1}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </Link>
        </button>
      )}
      {showPages}
      {currentPage < totalPages && (
        <button onClick={clicked} className={classes.controlBtn}>
          <Link to={`?page=${+currentPage + 1}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </Link>
        </button>
      )}
    </div>
    // </div>
  );
};

export default paginator;
