import React, { Component, Fragment } from 'react';

import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';
import { getPixelSize } from '../../utils';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Back } from './styles'

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
Geocoder.init('AIzaSyBEUR3Mo84MBRKpy4XRPbV-xY6W4S1z4So');
export default class Map extends Component {
    state = {
        destination: null,
        region: null,
        duration: null,
        location: null,
    }
    componentDidMount() {
        this.getCurrentLocation();

    }

    handleBack = () => {
        this.setState({ destination: null });
    }
    getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from(latitude, longitude);
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));
                this.setState({
                    location,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0134,
                        longitudeDelta: 0.0143,
                    }
                })
            }, //success
            () => { }, //Error,
            {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        });
    }

    render() {
        const { destination, region, duration, location } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    {
                        destination && (
                            <Fragment>
                                <Directions
                                    destination={destination}
                                    origin={region}
                                    onReady={result => {
                                        this.setState({
                                            duration: Math.floor(result.duration)
                                        })
                                        this.mapView.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: getPixelSize(50),
                                                left: getPixelSize(50),
                                                top: getPixelSize(50),
                                                bottom: getPixelSize(350)
                                            }
                                        })
                                    }}
                                />
                                <Marker
                                    coordinate={destination}
                                    anchor={{ x: 0, y: 0 }}
                                    image={markerImage}
                                >
                                    <LocationBox>
                                        <LocationText>
                                            {destination.title}
                                        </LocationText>
                                    </LocationBox>
                                </Marker>

                                <Marker
                                    coordinate={region}
                                    anchor={{ x: 0, y: 0 }}
                                >
                                    <LocationBox>
                                        <LocationTimeBox>
                                            <LocationTimeText>{duration}</LocationTimeText>
                                            <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                        </LocationTimeBox>
                                        <LocationText>
                                            {location}
                                        </LocationText>
                                    </LocationBox>
                                </Marker>
                            </Fragment>
                        )
                    }

                </MapView>
                {
                    destination ? (
                        <Fragment>
                            <Back onPress={this.handleBack}>
                                <Image source={backImage} />
                            </Back>
                            <Details />
                        </Fragment>
                    ) :
                        <Search onLocationSelected={this.handleLocationSelected} />

                }
            </View>
        );
    }
}
