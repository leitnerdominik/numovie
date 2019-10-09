import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../container/Layout/Layout';


const home = () => {
  return (
    <Layout>
      hello world
    </Layout>
  );
}

export default home;
