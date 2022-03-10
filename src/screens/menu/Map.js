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


    // Load the location of the user and set state
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

    // Load litters set state and load new litters every 2 seconds
    useEffect(() => {
        let interval
        const fetchData = async () => {
            try {
                const baseUrl = "http://178.18.252.126:1337"
                axios({
                    method: 'get',
                    url: `${baseUrl}/litters`,
                }).then((response) => {
                    const litters = response.data;
                    setLitters(litters);
                });
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchData()

        interval = setInterval(() => {
            fetchData()
        }, 2 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    // Map markers and show on map
    const mapMarkers = () => {
        return litters.map((litter, key) => {
            var imageUrl = "http://178.18.252.126:1337" + litter.pictureOfLitter[0].formats.large.url;
            return (
                <Marker
                    key={key}
                    coordinate={{ latitude: litter.latitude, longitude: litter.longitude }}>
                    {(String(litter.pickedUp)) === "true" ? <Image
                        source={require('../../assets/icons/icons8-recycle-bin-64_green.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    /> : <Image
                        source={require('../../assets/icons/icons8-recycle-bin-64_red.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />}
                    <Callout style={styles.callout} tooltip={true}>
                        <View style={styles.bubble}>
                            {isAndroid ? <WebView style={{ width: 100, height: 100 }} source={{ uri: imageUrl }} /> : <Image style={styles.image} source={{ uri: imageUrl }} />}
                            <Text style={styles.markerCalloutText}>Description: {litter.type}{"\n"}</Text>
                            <Text style={styles.markerCalloutText}>Category:  {litter.category}{"\n"}</Text>
                            <Text style={styles.markerCalloutText}>Picked up: {(String(litter.pickedUp)) === "true" ? " 👍" : " 👎"}</Text>
                        </View>
                    </Callout>
                </Marker >
            )
        });
    };

    // Show the activity indicator until location and litters aren´t loaded
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
                clusterColor={'#19cd21'}
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

    callout: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: '#9AB0A7',
        width: 300,
        height: 300
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#ffffff'
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        margin: 20,
        borderRadius: 6
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    markerCalloutText: {
        fontSize: 13
    }
});

export default Map;
