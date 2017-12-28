import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Grid} from 'semantic-ui-react';
import {current_location, get_user_profile, geocode_marker} from '../action/actions';
import {connect} from 'react-redux';
import '../scss/map.scss';

export class MapContainer extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    onMarkerClick = (props, marker, e) => {
        console.log("Props: ", props);
        console.log("Marker: ", marker);
        console.log("E: ", e);
    };

    componentWillMount() {
        // this.props.dispatch(current_location()); // Their server is down, craps
        this.props.dispatch(get_user_profile());
        const locations = JSON.parse(localStorage.getItem('locations'));
        locations.map((place) => {
            this.props.dispatch(geocode_marker(place));
        });
    }

    fetchPlaces = (mapProps, map) => {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        console.log("Service: ", service);
    };


    render() {

        return (
            <Grid className="map">
                <Grid.Row>
                    <Grid.Column width={4}>
                        <p>I am here</p>
                    </Grid.Column>


                    <Grid.Column width={12} className="map__display">

                        {
                            this.props.geocode ? <Map
                                google={this.props.google}
                                zoom={8}
                                className="map__display--map"
                                initialCenter={{
                                    lat: 33.753746,
                                    lng: -84.386330
                                }}
                                onReady = {this.fetchPlaces}
                            >

                                {
                                    this.props.geocode.map(({lat, lng}, index) => (
                                        <Marker
                                            draggable={true}
                                            key = {index}
                                            onClick={this.onMarkerClick}
                                            title={'The marker`s title will appear as a tooltip.'}
                                            name={'SOMA'}
                                            position={{lat, lng}}/>
                                    ))
                                }

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
        current_location: state.current_location,
        user: state.user,
        geocode: state.geocode
    }
};

export default connect(mapPropsToState)(GoogleApiWrapper({
    apiKey: 'AIzaSyCRKkfdFDQBX9qDs8sbu5BD62GweN2kMg0'
})(MapContainer));