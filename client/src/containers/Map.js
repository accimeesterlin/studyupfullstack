import React from 'react'
import { Grid } from 'semantic-ui-react';
import { current_location, get_user_profile, geocode_marker, all_events } from '../action/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import '../scss/map.scss';
import university from '../images/university.png';
import { locationsInStorage } from '../utils';


const { latitude, longitude } = JSON.parse(localStorage.getItem('geocode'));
let infowindow = new window.google.maps.InfoWindow();


export class MapContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { zoom: 5 }
    }

    componentWillMount() {
        this.props.dispatch(current_location());
        this.props.dispatch(get_user_profile());
        this.props.dispatch(all_events());
    }

    componentDidMount() {
        window.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 10,
            mapTypeId: 'roadmap',
            zoomControl: true
        });

        window.map.addListener('zoom_changed', () => {
            // this.setState({
            //     zoom: window.map.getZoom()
            // });
        });
    }


    componentWillReceiveProps(nextProps) {
        let events = [];
        for (let key in nextProps.events) {
            events.push(nextProps.events[key])
        }
        this.setState({ events });

        let locations = [];

        this.state.events ? this.state.events.map((event) => {
            axios.get('/api/geocode?address=' + event.place)
                .then((response) => {
                    const coordinate = response.data.results[0].geometry.location;
                    locations.push(coordinate);
                    this.setState({locations: locations});
                })
                .catch((err) => {
                    console.log("Error: ", err);
                });
        }) : '';
    }


    createMarker = (lat, lng) => {
        let marker = new window.google.maps.Marker({
            map: window.map,
            position: { lat, lng },
            icon: university,
            title: 'Checking'
        });

        marker.addListener('click', (e) => {
            infowindow.setContent(lat.toString());
            infowindow.open(window.map, marker);
        });

    };


    render() {
        this.state.locations ? this.state.locations.map(({ lat, lng }) => {
            this.createMarker(lat, lng);
        }) : '';

        return (
            <Grid className="map">

                <p>Zoom: {this.state.zoom}</p>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <p>I am here</p>
                    </Grid.Column>


                    <Grid.Column width={12} className="map__display">
                        <div id="map">

                        </div>

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
        geocode: state.geocode,
        events: state.events
    }
};

export default connect(mapPropsToState)(MapContainer);