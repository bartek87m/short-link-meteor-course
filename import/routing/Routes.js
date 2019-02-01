import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Notfound from '../ui/NotFound';
import Login from '../ui/Login';

export default class Routes extends React.Component {

    render(){
      return (
        <div>        
          <Router>
            <div>
              <Switch>             
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup}/>
                <Route path="/link" component={Link}/> 
                <Route path="/" component={Login}/> 
                <Route path="*" component={Notfound}/> 
              </Switch>
            </div>
          </Router>
        </div>
        
      );
    };
  };