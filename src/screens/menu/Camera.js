import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import LoadingCamera from '../loading/LoadingCamera';


const Camera = ({ navigation }) => {
    const [type, setType] = useState(ExpoCamera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [location, setLocation] = useState(null);
    const [photoId, setPhotoId] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [flashMode, setFlashMode] = useState('off');

    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const [isRatioSet, setIsRatioSet] = useState(false);

    const screenRatio = height / width;
    const { height, width } = Dimensions.get('window');

    // Loading camera
    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Load actual position of user
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            setLocation(location);
        })();
    }, []);

    // Set the camera ratio and padding.
    // This code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // Find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // Ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // Set the best match
            desiredRatio = minDistance;
            // Calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // Set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // Calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    // The camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    // Taking a picture
    const capture = async () => {
        if (camera && hasPermission == true) {
            const photo = await camera.takePictureAsync();
            setPhoto(photo.uri)
            navigation.navigate("Upload", { location: location, photo: photo });
        }
    }

    // Checking the flashMode
    const flashSwitchHandler = () => {
        if (flashMode === 'off') {
            setFlashMode('on')
        }
        if (flashMode === 'on') {
            setFlashMode('off')
        }
    }

    // Show the loading screen until location is loaded
    if (location == null) {
        return (
            <View>
                <LoadingCamera />
            </View>)
    }

    // When the permission is not given
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ExpoCamera
            type={type}
            style={[styles.cameraScreen, { marginTop: imagePadding, marginBottom: imagePadding }]}
            onCameraReady={setCameraReady}
            ratio={ratio}
            ref={(ref) => {
                setCamera(ref);
            }}
            autoFocus='on'
            flashMode={flashMode}
        >
            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.flipButton}
                    onPress={() => {
                        setType(
                            type === ExpoCamera.Constants.Type.back
                                ? ExpoCamera.Constants.Type.front
                                : ExpoCamera.Constants.Type.back
                        );
                    }}>
                    <Ionicons
                        color="white"
                        name="camera-reverse-outline"
                        size={SCREEN_HEIGHT * 0.08}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={
                        capture
                    }>
                    <Ionicons
                        color="white"
                        name="radio-button-on-outline"
                        size={SCREEN_HEIGHT * 0.08}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={flashSwitchHandler}
                >
                    <Ionicons
                        name={
                            flashMode !== 'off'
                                ? 'flash'
                                : 'flash-off'
                        }
                        size={30}
                        color="white"
                        style={styles.flashModeButton}
                    />
                </TouchableOpacity>
            </View>
        </ExpoCamera >
    )
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cameraScreen: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        flex: 1
    },
    cameraButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5,
        left: SCREEN_WIDTH * 0.35,
        right: SCREEN_WIDTH * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    bottomRow: {
        backgroundColor: 'transparent',
        marginBottom: 15,
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    flipButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 10,
        bottom: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    flashModeButton: {
        position: 'absolute',
        top: 20,
        left: 10
    }
});

export default Camera;