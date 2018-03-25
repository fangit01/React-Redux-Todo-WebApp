import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import List from './components/List';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Logout from './components/Logout';
import PageNotFound from './components/PageNotFound';
import Navbar from './components/Navbar';


class App extends Component {
  render() {
    return (

      <div className="App container">
        <Navbar />
        <Switch>
          <Route path="/list" exact component={List} />
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path='/about' render={()=><div><h3>ABOUT</h3><p>a online todo app. This web app is for demo purpose only.</p></div>}/>
          <Route path="/page_not_found" exact component={PageNotFound} />
         
          <Redirect from="/:others" to="/page_not_found" />
        </Switch>
      </div>

    );
  }
}

export default App;
