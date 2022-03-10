"use strict"

import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const Splashscreen = ({ navigation }) => {

    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAuthLoaded(true);
        }, 5000);
    }, []);

    useEffect(() => {
        if (authLoaded) {
            navigation.replace('Login');
        }
    }, [authLoaded, navigation]);

    return (
        <SafeAreaView >
            <Image
                source={require('../../assets/pictures/Logo.jpg')}
                style={styles.image} />
            <LottieView
                source={require("../../styles/Loading.json")}
                style={styles.lottieView}
                autoPlay
                loop />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    lottieView: {
        alignSelf: 'center',
        width: 200,
        height: 200
    }
})

export default Splashscreen;
