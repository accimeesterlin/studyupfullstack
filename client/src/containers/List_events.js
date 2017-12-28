import React from 'react';
import {connect} from 'react-redux';
import {get_user_profile} from '../action/actions';
import {Table} from 'semantic-ui-react';
import moment from 'moment';


class List_events extends React.Component {


    componentWillMount() {
        this.props.dispatch(get_user_profile());
    }


    displayEvents = (event) => (
        <Table.Body>
            {event ? event.map(({place, date, sms}, key) => (
                    <Table.Row key={key}>
                        <Table.Cell><p>{place}</p></Table.Cell>
                        <Table.Cell><p>{moment(date).format("dddd, MMMM Do YYYY")}</p></Table.Cell>
                        <Table.Cell><p>{moment(date).toNow(true) + " from now"}</p></Table.Cell>
                        <Table.Cell><p>{ sms ? "Sent" : "Loading..."}</p></Table.Cell>
                    </Table.Row>
                )) :
                <Table.Row>
                    <Table.Cell> Loading... </Table.Cell>
                </Table.Row>}
        </Table.Body>
    );


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
                            <Table.HeaderCell> Day remaining </Table.HeaderCell>
                            <Table.HeaderCell> SMS </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {this.displayEvents(event)}

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