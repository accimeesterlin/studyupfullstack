import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../action/actions';
import {connect} from 'react-redux';

import {
    Button,
    Form,
    Input,
    Message,
    Select,
} from 'semantic-ui-react';

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {};
    }


    getInputValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    sendData = () => {
        console.log("State: ", this.state);
        this.props.dispatch(login(this.state));
    };

    render() {


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


                    <Form.Field control={Button} onClick={this.sendData}>Submit </Form.Field>
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