import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import Signup from '../containers/Signup';
import SignIn from '../containers/SignIn';
import Home from '../App';
import Dashboard from '../containers/Dashboard';
import Map from '../containers/Map';
import Event from '../containers/Events';
import Profile from '../containers/Profile';
import List_events from '../containers/List_events';
import Header from '../components/Header';
import Footer from '../components/Footer';


const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}}/>}
        />
    )
};


const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => !isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>}
        />
    )
};

const routes = (props) => (

    <Router>
        <div className="container">
            {isAuthenticated ? <Header user = {props.user}/> : ''}
            <div className="content">
                <PublicRoute path="/" component={Home} />
                <PublicRoute path="/signup" component={Signup} />
                <PublicRoute path="/signin" component={SignIn} />
                <PrivateRoute path="/map" component={Map} />
                <PrivateRoute path="/event" component={Event} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/event/lists" component={List_events} />
            </div>
            <Footer/>
        </div>
    </Router>
);


const mapPropsToState = (state) => {
    return {
        registration: state.registration,
        user: state.user
    }
};

export default connect(mapPropsToState)(routes);