import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// pages
import Movies from './pages/movies';
import Series from './pages/series';
import Search from './pages/search/search';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/series" component={Series} />
        <Route path="/series/charts/:chart" component={Series} />
        <Route path="/charts/:chart" component={Movies} />
        <Route path="/search/:query" component={Search} />
        <Route exact path="/" component={Movies} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
