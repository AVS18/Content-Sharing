import React,{Component} from 'react';
import App from './Main';
import Dashboard from './Dashboard'
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';

class Routing extends Component
 {
  constructor(props)
  {
    super(props);
  }  
  render() {

    return (
      <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    )
  }
  
}

export default Routing;