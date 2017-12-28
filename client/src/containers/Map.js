import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Grid} from 'semantic-ui-react';
import {current_location} from '../action/actions';
import {connect} from 'react-redux';
import '../scss/map.scss';

export class MapContainer extends Component {

    onMarkerClick = (props, marker, e) => {
        console.log("Props: ", props);
        console.log("Marker: ", marker);
        console.log("E: ", e);
    };

    componentWillMount() {
        this.props.dispatch(current_location());
    }

    render() {

        return (
            <Grid className="map">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <p>I am here</p>
                    </Grid.Column>

                    <Grid.Column width={12} className="map__display">

                        {
                            this.props.current_location.lon ? <Map
                                google={this.props.google}
                                zoom={10}
                                className="map__display--map"
                                initialCenter={{
                                    lat: this.props.current_location.lat,
                                    lng: this.props.current_location.lon
                                }}
                            >

                                <Marker
                                    draggable={true}
                                    onClick={this.onMarkerClick}
                                    title={'The marker`s title will appear as a tooltip.'}
                                    name={'SOMA'}
                                    position={{lat: 37.778519, lng: -122.405640}}/>
                                <Marker
                                    name={'Dolores park'}
                                    position={{lat: 37.759703, lng: -122.428093}}/>
                                <Marker/>

                                <InfoWindow>
                                    <div>
                                        <h1>{}</h1>
                                    </div>
                                </InfoWindow>
                            </Map> : <p> Map is loading...</p>
                        }

                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        current_location: state.current_location
    }
};

export default connect(mapPropsToState)(GoogleApiWrapper({
    apiKey: 'AIzaSyCRKkfdFDQBX9qDs8sbu5BD62GweN2kMg0'
})(MapContainer));