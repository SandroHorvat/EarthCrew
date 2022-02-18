"use strict";

import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Alert, ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const Map = () => {
    const [location, setLocation] = useState(null);
    const [litters, setLitters] = useState([]);
    const mapStyle = require('../../assets/MapStyle.json');

    // Load actual position of user
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
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
        });
    }, [])

    /*
    const deleteMarks = () => {
        showConfirmDialog();
    };
 
    const showConfirmDialog = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete all litters ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => setLitters([])
                }
            ]
        );
    };

  <Image source={{ uri: "http://178.18.252.126:1337" + JSON.stringify(litters[0].pictureOfLitter[0].formats.large.url).slice(1, -1) }} style={{ width: 100, height: 100 }} />
    */

    const mapMarkers = () => {
        return litters.map((litter, key) => (
            <Marker
                key={key}
                coordinate={{
                    latitude: litter.latitude,
                    longitude: litter.longitude
                }}
                pinColor={"green"}
            >
                <Callout>
                    <Text>Description:  {litter.type}</Text>
                    <Text>Category:  {litter.category}</Text>
                    <Image source={{ uri: "http://178.18.252.126:1337" + litter.pictureOfLitter[0].formats.large.url }} style={{ width: 100, height: 100 }} />
                </Callout>
            </Marker >
        ));
    };

    if (location == null || litters == null) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <View>
                    <ActivityIndicator size="large" color={"green"} />
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsBuildings={true}
                userLocationFastestInterval={5000}
                zoomEnabled={true}
                provider="google">

                {mapMarkers()}

            </MapView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 300,
        backgroundColor: "#b5ff9a",
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#b5ff9a',
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;
