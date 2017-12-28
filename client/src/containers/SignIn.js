import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../action/actions';
import { connect } from 'react-redux';
import { authorizeUser } from '../utils';


import {
    Button,
    Form,
    Input,
    Message,
} from 'semantic-ui-react';

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {

    }


    getInputValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    sendData = () => {
        this.props.dispatch(login(this.state));
    };

    render() {
        const {isAuthenticated} = this.props.registration;
        authorizeUser(isAuthenticated);

        return (
            <div>
                <Form error={this.props.registration.error}>
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


                    <Form.Field control={Button} onClick={this.sendData}>Sign In </Form.Field>
                </Form>
                <Link to="/signup"> Go to Sign Up</Link>
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        registration: state.registration
    }
};

export default connect(mapPropsToState, null)(SignIn);