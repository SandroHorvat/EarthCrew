"use strict"

import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Map = () => {
    const [location, setLocation] = useState(null);
    const [litters, setLitters] = useState([])
    const [showBox, setShowBox] = useState(true);
    const [marks, setMarks] = useState([{
        title: "hello",
        key: 1,
        coordinates: {
            latitude: 47.41635677999391,
            longitude: 9.751806868932027
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
        showConfirmDialog()
        setMarks({ marks: [] });
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure you want to remove the litters you have uploaded?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        setShowBox(false);
                        setMarks({ marks: [] });
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        )
    }

    const mapMarkers = () => {
        return marks.map((marks) =>
            <Marker
                key={marks.key}
                coordinate={marks.coordinates}
                title={marks.location}>
            </Marker>
        )
    }


    if (location == null || litters == null) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <View>
                    <ActivityIndicator size="large" color={"green"} />
                </View>
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
                {mapMarkers}
            </MapView>
            <Button title='Delete Marks' onPress={showConfirmDialog()} />
        </View >
    )
}

const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 300,
        backgroundColor: "#b5ff9a",
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },

})

export default Map;
