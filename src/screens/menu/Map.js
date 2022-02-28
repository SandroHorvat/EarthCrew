"use strict";

import React, { useEffect, useState, useRef } from "react";
import { Callout, Marker } from "react-native-maps";
import { Alert, ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, Platform, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { WebView } from 'react-native-webview';
import MapView from "react-native-map-clustering";

const Map = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [litters, setLitters] = useState([]);
    const mapRef = useRef(null);

    const mapStyle = require('../../styles/MapStyle.json');
    const isAndroid = Platform.OS === 'android'

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Alert.alert(errorMsg)
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    // Load litters and set state
    useEffect(() => {
        let baseUrl = "http://178.18.252.126:1337"
        axios({
            method: 'get',
            url: `${baseUrl}/litters`,
        }).then((response) => {
            const litters = response.data;
            setLitters(litters);
        });
    }, [])

    const mapMarkers = () => {
        return litters.map((litter, key) => {
            var imageUrl = "http://178.18.252.126:1337" + litter.pictureOfLitter[0].formats.large.url;

            return (
                <Marker
                    key={key}
                    coordinate={{ latitude: litter.latitude, longitude: litter.longitude }}
                    pinColor={"green"}>
                    <Callout style={styles.callout}>
                        <Text>Description:  {litter.type}</Text>
                        <Text>Category:  {litter.category}</Text>
                        {isAndroid ? <WebView style={{ width: 100, height: 100 }} source={{ uri: imageUrl }} /> : <Image style={styles.image} source={{ uri: imageUrl }} />}
                    </Callout>
                </Marker >
            )
        });
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

    // Initial region must be defined
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                animationEnabled={true}
                animationEnabled={true}
                clusterColor={'#19cd21'}
                spiderLineColor={'#19cd21'}
                tracksViewChanges={true}
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
        </SafeAreaView >
    );

}
const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 300,
        backgroundColor: "#fff",
        marginBottom: 30,
    },
    callout: {
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        width: 140,
        height: 140,
        marginTop: 10,
        borderRadius: 14
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;
