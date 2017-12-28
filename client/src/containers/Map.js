import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Grid} from 'semantic-ui-react';
import {current_location, get_user_profile, geocode_marker} from '../action/actions';
import {connect} from 'react-redux';
import '../scss/map.scss';

export class MapContainer extends Component {

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
        this.props.dispatch(current_location());
        this.props.dispatch(get_user_profile("Roswell"));
        console.log("Hello World");
        const locations = JSON.parse(localStorage.getItem('locations'));
        console.log("Locations: ", locations);
        locations.map((el) => {
            console.log("Component Mount: ",el);
            this.props.dispatch(geocode_marker(el));

        });
    }


    componentDidMount() {

    }


    convertToGeocode = () => {
        const {event} = this.props.user;
        const locations = [];
        event ? event.map(({place}) => {
            locations.push(place);
        }) : console.log("Not Loading yet");

        localStorage.setItem('locations', JSON.stringify(locations));
        return locations;
    };


    render() {

       if(this.props.user){
           this.convertToGeocode();
       }

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
                            >

                                {
                                    this.props.geocode.map(({lat, lng}) => (
                                        <Marker
                                            draggable={true}
                                            onClick={this.onMarkerClick}
                                            title={'The marker`s title will appear as a tooltip.'}
                                            name={'SOMA'}
                                            position={{lat, lng}}/>
                                    ))
                                }
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
        current_location: state.current_location,
        user: state.user,
        geocode: state.geocode
    }
};

export default connect(mapPropsToState)(GoogleApiWrapper({
    apiKey: 'AIzaSyCRKkfdFDQBX9qDs8sbu5BD62GweN2kMg0'
})(MapContainer));