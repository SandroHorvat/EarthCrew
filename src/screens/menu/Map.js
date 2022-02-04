"use strict"

import React, { useEffect, useState } from 'react';
import MapView, { AnimatedRegion, Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import LoadingMap from '../loading/LoadingMap';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const Map = () => {
    const [location, setLocation] = useState(null);
    const [litters, setLitters] = useState([])

    // Load actual position of user
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        // Load litters and set state
        let baseUrl = "http://178.18.252.126:1337"
        axios({
            method: 'get',
            url: `${baseUrl}/litters`,
        }).then((response) => {
            const litters = response.data;
            setLitters(litters);

            console.log(litters[0].type)
            console.log(litters[0].latitude)
            console.log(litters[0].longitude)

        });
    }, [])

    if (location == null || litters == null) {
        return (
            <View>
                <LoadingMap />
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                query={{
                    key: 'AIzaSyCnQevVUua2qjIGihUv1_a1AIZLFwTzq0o',
                    language: 'en',
                    type: 'establishment'
                }} />
            <MapView
                style={styles.map}
                mapType='standard'
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsBuildings={true}
                userLocationFastestInterval={5000}
                showsCompass={true}
                zoomEnabled={true}
                provider="google" >
                <Marker
                    coordinate={{
                        latitude: litters[0].latitude,
                        longitude: litters[0].longitude
                    }}
                    title={litters[0].type}
                    description={litters[0].type}>
                </Marker >
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default Map;
