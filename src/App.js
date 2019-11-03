import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// pages
import Movies from './pages/movies';
import Series from './pages/series';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/series" component={Series} />
        <Route path="/series/charts/:chart" component={Series} />
        <Route path="/charts/:chart" component={Movies} />
        <Route exact path="/" component={Movies} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
