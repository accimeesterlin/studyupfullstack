import React from 'react';
import {connect} from 'react-redux';
import {get_user_profile} from '../action/actions';
import {isEmptyObj} from '../utils';
import {Table} from 'semantic-ui-react';


class List_events extends React.Component {


    componentWillMount() {
        const {user} = this.props;
        if (!isEmptyObj(user)) {
            this.props.dispatch(get_user_profile());
        }
    }


    render() {
        const {event} = this.props.user;

        console.log("Events: ", event);
        return (
            <div>
                <h2> This is a list of all your events here </h2>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Place</Table.HeaderCell>
                            <Table.HeaderCell> Date </Table.HeaderCell>
                            <Table.HeaderCell> SMS </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { event ? event.map(({place, date, sms}) => (
                            <Table.Row>
                                <Table.Cell> {place} </Table.Cell>
                                <Table.Cell> {date} </Table.Cell>
                                <Table.Cell> {sms} </Table.Cell>
                            </Table.Row>
                        )) : '' }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapPropsToState)(List_events);