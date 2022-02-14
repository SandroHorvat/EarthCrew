"use strict"

import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, SafeAreaView, Switch, Dimensions, Modal } from 'react-native';
import { Card } from 'react-native-elements'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Tooltip from 'react-native-walkthrough-tooltip';
import * as Animatable from 'react-native-animatable';

const Upload = ({ route, navigation: { setParams } }) => {

    // When photo is present
    if (route.params?.photo) {
        const { photo, location, isDisabled, sendStatus } = route.params;
        const [modalOpen, setModalOpen] = useState(false);
        const [pickedUp, setPickedUp] = useState(false);
        const [text, onChangeText] = useState(null);
        const [showTip, setTip] = useState(false);

        // Report litter
        const reportLitter = async () => {
            if (sendStatus == null) {
                const latitude = location.coords.latitude
                const longitude = location.coords.longitude

                //Multipart request
                const data = new FormData();

                data.append('files', {
                    uri: photo.uri,
                    name: "test.jpg",
                    type: 'multipart/form-data'
                });

                const requestConfig = {
                    method: 'POST',
                    body: data,
                };

                const response = await fetch("http://178.18.252.126:1337/upload", requestConfig);
                let responseJson = await response.json();

                axios.post("http://178.18.252.126:1337/litters", {
                    latitude: latitude,
                    longitude: longitude,
                    type: text,
                    pictureOfLitter: responseJson[0].id,
                    pickedUp: pickedUp
                })
            } else
                return (
                    <Text>Error</Text>
                )
        }

        // Switcher for picked up or not picked up
        const toggleSwitch = () => {
            setPickedUp(previousState => !previousState);
        }

        // Show information when litter was successfully sended
        const showToast = () => {
            if (isDisabled == false) {
                Toast.show({
                    type: 'success',
                    text1: 'Successfully uploaded',
                    text2: 'Your litter was succesffully sent 👋'
                })
            }
        }

        // Is the litter already send or not (Icon) & (Text)
        const litterAlreadySent = () => {
            if (isDisabled == true) {
                return (
                    <View >
                        <AntDesign style={{ fontSize: 30, color: "green" }} name="checkcircleo" size={24} color="black" />
                        <Text>Litter successfully send </Text>
                    </View >
                )

            } else if (isDisabled == false) {
                return (
                    <View >
                        <AntDesign style={{ fontSize: 30, color: "red" }} name="closesquareo" size={24} color="black" />
                        <Text>Litter not send yet</Text>
                    </View>
                )
            }
        }

        // onRequestClose for Android User
        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <Animatable.Image animation={"zoomIn"} iterationCount={"infinite"} direction="alternate-reverse" style={styles.photo} source={{ uri: photo.uri }} easing={"ease"} />
                </TouchableOpacity>

                <Modal visible={modalOpen} animationType='slide' onRequestClose={() => setModalOpen(false)}>
                    <View style={styles.modalContainer}>
                        <Ionicons
                            name='close'
                            size={25}
                            style={styles.modalClose}
                            onPress={() => setModalOpen(false)} />

                        <View style={styles.innerContainer}>
                            <Card>
                                <Text >{pickedUp ? "Picked up" : "Not picked up"}  </Text>
                            </Card>

                            <Card>
                                {litterAlreadySent()}
                            </Card>
                        </View>

                        <Image style={styles.modalPhoto} source={{ uri: photo.uri }} />

                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#ff0000", true: "#00ff00" }}
                            thumbColor={pickedUp ? "#006400" : "#800000"}
                            ios_backgroundColor="#ff0000"
                            onValueChange={toggleSwitch}
                            value={pickedUp} />

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Fill the type of litter in here"
                            keyboardType='default' />

                        <TouchableOpacity
                            activeOpacity={10}
                            style={styles.sendButton}
                            disabled={isDisabled}
                            onPress={() => {
                                reportLitter();
                                setParams({
                                    isDisabled: (true)
                                })
                                showToast()
                            }} >
                            < Ionicons
                                color="white"
                                name="send-outline"
                                size={SCREEN_HEIGHT * 0.07} />
                        </TouchableOpacity>

                        <Toast />

                        <Tooltip
                            isVisible={showTip}
                            content={<Text>At the top you can write the type of the litter in. Then please give the litter a status. Did you picked it up or not ?</Text>}
                            placement="top"
                            onClose={() => setTip(false)}
                            // below is for the status bar of react navigation bar
                            topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}>
                            <TouchableOpacity
                                style={[styles.infoBox, styles.button]}
                                onPress={() => setTip(true)}>
                                <Text>Information</Text>
                            </TouchableOpacity>
                        </Tooltip>
                    </View>

                </Modal>
            </SafeAreaView >
        );
    } else {
        return <View style={styles.container}>
            <Text style={{ margin: 20, fontSize: 30 }}>First take a photo</Text>
            <AntDesign name="camerao" size={100} color="black" />
        </View>
    }
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 4
    },
    card: {
        position: 'absolute',
        top: 120
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b5ff9a',
    },
    input: {
        position: 'absolute',
        height: 40,
        width: 200,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        top: 30,
        borderRadius: 10,
        borderColor: "green"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b5ff9a',
    },
    modalClose: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    modalPhoto: {
        position: 'absolute',
        top: 260,
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    photo: {
        borderRadius: 10,
        width: 250,
        height: 250
    },
    sendButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 5,
        right: 10,
        zIndex: 1
    },
    switch: {
        position: 'absolute',
        bottom: 120,
        margin: 20
    },
    innerContainer: {
        width: "100%",
        position: 'absolute',
        top: 130,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    infoBox: {
        position: 'relative',
        top: 250,
        margin: 20,
        backgroundColor: 'green',
        width: 85,
        height: 38,
        margin: 20
    }
})

export default Upload;