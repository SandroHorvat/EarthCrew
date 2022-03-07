import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { switchState, valueItemsState } from '../../../atoms';
import { useResetRecoilState } from 'recoil';

const Camera = ({ navigation }) => {

    const [type, setType] = useState(ExpoCamera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [location, setLocation] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [flashMode, setFlashMode] = useState('off');
    const [isDisabled, setIsDisabled] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);
    const [text, setText] = useState(null);

    const [ratio, setRatio] = useState('4:3') // default is 4:3
    const screenRatio = height / width
    const [isRatioSet, setIsRatioSet] = useState(false)
    const { height, width } = Dimensions.get('window')
    // Just use when needed
    const [imagePadding, setImagePadding] = useState(0)

    // Ratio preparing Android
    async function prepareRatio() {
        let desiredRatio = '4:3' // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await ExpoCamera.getSupportedRatiosAsync()
            let distances = {}
            let realRatios = {}
            let minDistance = null
            for (const ratio of ratios) {
                const parts = ratio.split(':')
                const ratioHeight = parseInt(parts[0])
                const ratioWidth = parseInt(parts[1])
                const realRatio = ratioHeight / ratioWidth
                realRatios[ratio] = realRatio
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio
                distances[ratio] = realRatio
                if (minDistance == null) {
                    minDistance = ratio
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance

            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            )

            // set the preview padding and preview ratio
            setImagePadding(remainder / 2)
            console.log(`okay look ${remainder / 2}`)
            setRatio(desiredRatio)
            // Set a flag so we don't do this
            // calculation each time the screen refreshes
            setIsRatioSet(true)
        }
    }

    // Set camera ready
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio()
        }
    }

    // Loading the camera
    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Loading the actual position of user
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

    // Taking a picture
    const capture = async () => {
        if (camera && hasPermission == true) {
            const photo = await camera.takePictureAsync();
            setPhoto(photo.uri)
            setIsDisabled(false)
            setSendStatus(null)
            setText(null)
            navigation.navigate("Upload", { location: location, photo: photo, isDisabled: isDisabled, sendStatus: sendStatus, text: text });
        }
    }

    // Reset the state of the switcher in upload to false
    const resetList = useResetRecoilState(switchState);

    // Reset the state of the valueItems in upload to null
    const resetValueItems = useResetRecoilState(valueItemsState);


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
            <View style={[styles.containerLoading, styles.horizontal]}>
                <View>
                    <ActivityIndicator size="large" color={"green"} />
                </View>
            </View>
        )
    }

    // When the permission is not given
    if (hasPermission === null) {
        return <Text>No access to camera</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ExpoCamera
        type={type}
        onCameraReady={setCameraReady}
        ratio={'4:3'}
        style={styles.cameraScreen}
        ref={ref => setCamera(ref)}
        autoFocus='on'
        flashMode={flashMode}>
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
                    size={height * 0.08} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => { capture(); resetList(); resetValueItems(); }}>
                <Ionicons
                    color="white"
                    name="radio-button-on-outline"
                    size={height * 0.08} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={flashSwitchHandler}>
                <Ionicons
                    name={flashMode !== 'off'
                        ? 'flash'
                        : 'flash-off'}
                    size={30}
                    color="white"
                    style={styles.flashModeButton} />
            </TouchableOpacity>
        </View>
    </ExpoCamera >
)
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({

bottomRow: {
    backgroundColor: 'transparent',
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
},
cameraScreen: {
    height: height,
    width: width,
    flex: 1
},
cameraButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 5,
    left: width * 0.35,
    right: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
},
container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
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
    top: 40,
    left: 10
},
horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}
});


export default Camera;