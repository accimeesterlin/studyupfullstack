import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {register} from '../action/actions';
import {connect} from 'react-redux';

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


    getInputValue = (event, val, attr) => {
        const name = event.target.name;
        const value = event.target.value;
        if (val && attr) {
            this.setState({[attr]: val});
        } else {
            this.setState({[name]: value});
        }
    };

    sendData = () => {
        console.log("State: ", this.state);
        this.props.dispatch(register(this.state));
    };

    render() {

        if(this.props.registration.isAuthenticated){
            return ( <Redirect to={{pathname: '/dashboard', state: {from: this.props.location}}} /> );
        }

        const options = [
            {key: 'm', text: 'Male', value: 'male'},
            {key: 'f', text: 'Female', value: 'female'}
        ];
        return (
            <div>
                <Form error={this.props.registration.error}>

                    <Form.Group widths='equal'>
                        <Form.Field control={Input} name='firstname' label="Firstname: " onChange={this.getInputValue}/>
                        <Form.Field control={Input} name='lastname' label="Lastname: " onChange={this.getInputValue}/>
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
                            label="Username:"
                            name='username'
                            placeholder="Please enter a username"
                            width={16}
                            onChange={this.getInputValue}
                        />

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


                    <Form.Field control={Button} onClick={this.sendData}>Submit </Form.Field>

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