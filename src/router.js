import React from 'react';
import {Route, Router, Switch} from 'dva/router';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={require('./routes/Index').default}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
