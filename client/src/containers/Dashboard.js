import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {locationsInStorage} from '../utils';
import {get_user_profile} from '../action/actions';
import '../scss/dashboard.scss';




class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount(){
        this.props.dispatch(get_user_profile())
    }


    render() {
        const {event} = this.props.user;
        locationsInStorage(event);

        return (
            <div className="dashboard">
                <Link to = '/map'> <Button> <Icon name = 'calendar'/> Study Now </Button></Link>
                <Link to = "/event"> <Button> <Icon name = 'add to calendar'/> Study Later </Button> </Link>
            </div>
        );
    }
}


const mapPropsToState = (state) => {
  return{
      user: state.user
  }
};


export default connect(mapPropsToState)(Dashboard);