import React from 'react';
import {connect} from 'react-redux';
import {isEmptyObj} from '../utils';
import {
    get_user_profile,
    schedule_event,
    schedule_confirmation
} from '../action/actions';
import {Form, Input, Button, Checkbox} from 'semantic-ui-react';
import {Redirect, Link} from 'react-router-dom';


class Event extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        const {user} = this.props;
        if (!isEmptyObj(user)) {
            this.props.dispatch(get_user_profile());
        }

        let map = new window.google.maps.Map('', {});

        this.autocomplete(map);

    }

    display_marker = (map) => {
        let marker = new window.google.maps.Marker({
            map,
            position: {lat: -33.8688, lng: 151.2195}
        });

        return marker;
    };

    autocomplete = (map) => {
        let inputNode = document.getElementById('place');
        let autocomplete = new window.google.maps.places.Autocomplete(inputNode);
        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();

            this.setState({
                place: place.formatted_address,
            });
        })
    };

    getInputValue = (event, val, attr) => {
        const name = event.target.name;
        const value = event.target.value;
        if (val && attr)
            this.setState({[attr]: val});
        if (val.checked)
            this.setState({[val.name]: val.checked});
        else
            this.setState({[name]: value});
    };

    submit = () => {
        this.props.dispatch(schedule_event(this.state));

    };

    render() {

        if (this.props.schedule.msg === true) {
            this.props.dispatch(schedule_confirmation(false));
            return ( <Redirect to={{
                pathname: '/event/lists',
                state: {from: this.props.location}
            }}/>);
        }


        return (
            <div>
                <h2>Create a study group</h2>

                <p>Or</p>

                <Link to='/event/lists'><p>See all your study groups </p></Link>

                <Form>

                    <Form.Group>
                        <Form.Field
                            control={Input}
                            width={7}
                            name='group'
                            onChange={this.getInputValue}
                            label='Group Name'
                            placeholder='Group name...'/>
                    </Form.Group>



                    <Form.Group>
                        <Form.Field
                            control={Input}
                            width={7}
                            name='subject'
                            onChange={this.getInputValue}
                            label='Subject to discuss'
                            placeholder='Subject...'/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Field
                            control={Input}
                            width={7}
                            name='place'
                            id = 'place'
                            onChange={this.getInputValue}
                            label='Where would you like to meet?'
                            placeholder='Location'/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Input}
                            width={7}
                            label='Date:'
                            name='date'
                            placeholder='Date'
                            onChange={this.getInputValue}
                            type='date'/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Checkbox}
                            onChange={this.getInputValue}
                            name='sms'
                            label='Would you like to receive SMS when your classmates are available to study now?'
                            placeholder='Receive Text: '
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Button} onClick={this.submit}> Create </Form.Field>
                    </Form.Group>
                </Form>


                <div id="map">

                </div>
            </div>
        );
    }
}


const mapPropsToState = (state) => {
    return {
        user: state.user,
        geocode: state.geocode,
        schedule: state.schedule
    }
};

export default connect(mapPropsToState)(Event);