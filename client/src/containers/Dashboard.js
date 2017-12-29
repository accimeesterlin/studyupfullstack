import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {locationsInStorage} from '../utils';
import {get_user_profile, current_location, all_events} from '../action/actions';
import '../scss/dashboard.scss';


class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(get_user_profile());
        this.props.dispatch(current_location());
        this.props.dispatch(all_events());
    }


    render() {

        let events = [];
        for (let key in this.props.events) {
            events.push(this.props.events[key])
        }
        locationsInStorage(events);


        const {latitude, longitude} = this.props.current_location;
        const geocode = {latitude, longitude};
        localStorage.setItem('geocode', JSON.stringify(geocode));


        return (
            <div className="dashboard">
                <Link to='/map'> <Button> <Icon name='calendar'/> Study Now </Button></Link>
                <Link to="/event"> <Button> <Icon name='add to calendar'/> Study Later </Button> </Link>
            </div>
        );
    }
}


const mapPropsToState = (state) => {
    return {
        user: state.user,
        current_location: state.current_location,
        events: state.events
    }
};


export default connect(mapPropsToState)(Dashboard);