import React from 'react';
import {Link} from 'react-router-dom';
import {register} from '../action/actions';
import {connect} from 'react-redux';
import {authorizeUser} from '../utils';
import {Dropdown} from 'semantic-ui-react';


import {
    Button,
    Form,
    Input,
    Message,
    Select,
} from 'semantic-ui-react';

class Signup extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        let map = new window.google.maps.Map('', {});

        this.autocomplete(map);
    }


    getInputValue = (event, val, attr) => {
        const name = event.target.name;
        const value = event.target.value;
        if (val && attr) {
            this.setState({[attr]: val});
        } else {
            this.setState({[name]: value});
        }
    };


    autocomplete = (map) => {
        let inputNode = document.getElementById('address');
        let autocomplete = new window.google.maps.places.Autocomplete(inputNode);
        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();
            let location = place.geometry.location;

            this.setState({
                place: place.formatted_address,
                place_id: place.place_id,
                place_location: location.toString(),
            });
        })
    };

    sendData = () => {
        this.props.dispatch(register(this.state));
    };

    render() {
        const {isAuthenticated} = this.props.registration;
        authorizeUser(isAuthenticated);

        const options = [
            {key: 'm', text: 'Male', value: 'male'},
            {key: 'f', text: 'Female', value: 'female'}
        ];

        const universityOptions = [
            {key: 'AL1', value: 'arizona', text: 'U. of Arizona'},
            {key: 'AL2', value: 'western', text: 'Case Western Reserve University'},
            {key: 'AL3', value: 'denver', text: 'U. of Denver'},
            {key: 'AL4', value: 'gatech', text: 'Georgia Institute of Technology'},
            {key: 'AL5', value: 'washington', text: 'George Washington University'},
            {key: 'AL6', value: 'miami', text: 'U. of Miami'},
            {key: 'AL7', value: 'minnesota', text: 'U. of Minnesota'},
            {key: 'AL8', value: 'hampshire', text: 'U. of New Hampshire'},
            {key: 'AL9', value: 'Northwestern', text: 'Northwestern University'},
            {key: 'AL10', value: 'Virginia', text: 'U. of Richmond / Virginia'},
            {key: 'AL11', value: 'Rutgers', text: 'Rutgers University'},
            {key: 'AL12', value: 'Methodist', text: 'Southern Methodist University'},
            {key: 'AL13', value: 'Berkeley', text: 'U. of Calif Berkeley'},
            {key: 'AL14', value: 'Florida', text: 'U. of Central Florida'},
            {key: 'AL15', value: 'Irvine', text: 'U. of Calif Irvine'},
            {key: 'AL16', value: 'Los Angeles', text: 'U. of Calif Los Angeles'},
            {key: 'AL17', value: 'San Diego', text: 'U. of Calif San Diego'},
            {key: 'AL18', value: 'San Francisco', text: 'U. of Calif San Francisco'},
            {key: 'AL19', value: 'Kansas', text: 'U. of Kansas'},
            {key: 'AL20', value: 'Massachusetts', text: 'U. of Massachusetts - Amherst'},
            {key: 'AL21', value: 'Chapel Hill', text: 'U. of North Carolina - Chapel Hill'},
            {key: 'AL22', value: 'Charlotte', text: 'U. of North Carolina - Charlotte'},
            {key: 'AL23', value: 'Raleigh', text: 'U. of North Carolona - Raleigh'},
            {key: 'AL24', value: 'California', text: 'U. of Southern California'},
            {key: 'AL25', value: 'Austin', text: 'U. of Texas at Austin'},
            {key: 'AL26', value: 'Utah', text: 'U. of Utah'},
            {key: 'AL27', value: 'Houston', text: 'U. of Texas at Houston'},
        ];


        const cohorts = [
            {key: 'cohort1', value: 'Cohort 1', text: 'Cohort 1'},
            {key: 'cohort2', value: 'Cohort 2', text: 'Cohort 2'},
            {key: 'cohort3', value: 'Cohort 3', text: 'Cohort 3'},
            {key: 'cohort4', value: 'Cohort 4', text: 'Cohort 4'},
            {key: 'cohort5', value: 'Cohort 5', text: 'Cohort 5'},

        ];


        return (
            <div>
                <Form error={this.props.registration.error}>

                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            name='firstname'
                            label="Firstname: "
                            placeholder='Firstname'
                            onChange={this.getInputValue}/>
                        <Form.Field
                            control={Input}
                            name='lastname'
                            label="Lastname: "
                            placeholder='Lastname'
                            onChange={this.getInputValue}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Field
                            control={Select}
                            label="Gender"
                            options={options}
                            placeholder="Male"
                            onChange={(e, {value}) => this.getInputValue(e, value, 'gender')}
                        />


                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Address"
                            name='address'
                            id='address'
                            placeholder="Please enter your address"
                            width={16}
                            onChange={this.getInputValue}
                        />

                    </Form.Group>


                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Username:"
                            name='username'
                            placeholder="Please enter a username"
                            width={16}
                            onChange={this.getInputValue}
                        />

                    </Form.Group>


                    <Form.Group>
                        <Form.Field width={5}>
                            <label>Select University</label>
                            <Dropdown
                                placeholder="Select your university..."
                                search
                                selection

                                options={universityOptions} width={16}
                                onChange={(e, {value}) => this.getInputValue(e, value, 'university')}
                            />

                        </Form.Field>
                    </Form.Group>


                    <Form.Group>
                        <Form.Field width={5}>
                            <label>Select Cohort</label>
                            <Dropdown
                                placeholder="Select your cohort..."
                                search
                                selection
                                options={cohorts} width={5}
                                onChange={(e, {value}) => this.getInputValue(e, value, 'cohort')}
                            />

                        </Form.Field>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Email:"
                            name='email'
                            placeholder="Please enter your email"
                            width={16}
                            onChange={this.getInputValue}
                        />


                    </Form.Group>


                    <Form.Group>
                        <Form.Field
                            control={Input}
                            label="Password:"
                            name='password'
                            type="password"
                            placeholder="Please enter your password"
                            width={16}
                            onChange={this.getInputValue}
                        />

                    </Form.Group>

                    <Message
                        error
                        content={this.props.registration.msg}
                    />


                    <Form.Field control={Button} onClick={this.sendData}>Sign Up </Form.Field>

                </Form>
                <Link to="/signin"> Go to Sign In</Link>
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        registration: state.registration
    }
};

export default connect(mapPropsToState, null)(Signup);