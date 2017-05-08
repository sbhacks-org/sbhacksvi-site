import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';

class Routes extends React.component {
  render() {
    return (
      <div>
        <Switch>
          <Route path = '*' component = {App} />
        </Switch>
      </div>
    )
  }
}

export default Routes;
