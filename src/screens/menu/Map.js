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
    const [marks, setMarks] = useState([{
        title: "hello",
        key: 1,
        coordinates: {
            latitude: 3.148561,
            longitude: 101.652778
        },
    },
    {
        title: "hello",
        key: 2,
        coordinates: {
            latitude: 3.149771,
            longitude: 101.655449
        },
    }])

    console.log(marks[0].coordinates)

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

    const loadLitters = () => {
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
        }
        )
    }

    const deleteMarks = () => {
        setMarks({ marks: [] });
    }

    if (location == null || litters == null) {
        return (
            <View>
                <LoadingMap />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }} >
            <MapView
                style={styles.map}
                mapType='standard'
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsBuildings={true}
                userLocationFastestInterval={5000}
                zoomEnabled={true}
                provider="google">

                {marks.map(marks => (
                    <Marker
                        key={marks[0].key}
                        coordinate={marks[0].coordinates}
                    />
                ))}
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
})

export default Map;
