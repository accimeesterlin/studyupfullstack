import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import Signup from '../containers/Signup';
import SignIn from '../containers/SignIn';
import Home from '../App';
import Dashboard from '../containers/Dashboard';

const cookies = new Cookies();



const PublicRoute = ({component: Component, registration, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => cookies.get === ''
                ? <Component {...props} />
                : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>}
        />
    )
};

const PrivateRoute = ({component: Component, registration, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => !registration.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>}
        />
    )
};

const routes = (props) => (
    <Router>
        <div>
            <PublicRoute path="/" {...props} component={Home}/>
            <PublicRoute path="/signup" {...props} component={Signup}/>
            <PublicRoute path="/signin" {...props} component={SignIn}/>
            <PrivateRoute path="/dashboard" {...props} component={Dashboard}/>
        </div>
    </Router>
);


const mapPropsToState = (state) => {
    return {
        registration: state.registration
    }
};

export default connect(mapPropsToState)(routes);