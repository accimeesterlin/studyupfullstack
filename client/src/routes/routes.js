import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from '../containers/Signup';
import SignIn from '../containers/SignIn';
import Home from '../App';
import Dashboard from '../containers/Dashboard';



const PrivateRoute =  ({component: Component, registration, ...rest}) => {
  return (
    <Route
      {...rest}
      render = { (props) => registration.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/signup', state: { from: props.location }}} />}
    />
  )
};

const routes = (props) => (
    <Router>
        <div>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/signup" component={ Signup }/>
            <Route path="/signin" component={ SignIn }/>
            <PrivateRoute path="/dashboard" { ...props } component={ Dashboard }/>
        </div>
    </Router>
);


const mapPropsToState = (state) => {
    return {
        registration: state.registration
    }
};

export default connect(mapPropsToState)(routes);