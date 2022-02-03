"use strict"

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, SafeAreaView, Switch, Dimensions, Alert, Modal, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Upload = ({ route }) => {

    // When photo is present
    if (route.params?.photo) {
        const { photo, location } = route.params;
        const [modalOpen, setModalOpen] = useState(false)
        const [pickedUp, setPickedUp] = useState(false)
        const [text, onChangeText] = useState(null);

        // Switcher for picked up or not picked up
        const toggleSwitch = () => {
            setPickedUp(previousState => !previousState);
        }

        // Report litter
        const reportLitter = async () => {
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
        }

        // onRequestClose for Android User
        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <Image style={styles.photo} source={{ uri: photo.uri }} />
                </TouchableOpacity>

                <Modal visible={modalOpen} animationType='slide' onRequestClose={() => setModalOpen(false)}>
                    <View style={styles.modalContainer}>
                        <Ionicons
                            name='close'
                            size={25}
                            style={styles.modalClose}
                            onPress={() => setModalOpen(false)} />

                        <View style={styles.card}>
                            <Card >
                                <Card.Title  >
                                    <Text>
                                        {pickedUp ? "Picked up" : "Not picked up"}
                                    </Text>
                                </Card.Title>
                            </Card>
                        </View>
                        <Image style={styles.modalPhoto} source={{ uri: photo.uri }} />
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#ff0000", true: "#00ff00" }}
                            thumbColor={pickedUp ? "#006400" : "#800000"}
                            ios_backgroundColor="#ff0000"
                            onValueChange={toggleSwitch}
                            value={pickedUp}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Fill the type of litter in here"
                            keyboardType='default'
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => {
                                reportLitter()
                            }}>
                            <Ionicons
                                color="white"
                                name="send-outline"
                                size={SCREEN_HEIGHT * 0.07} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                
            </SafeAreaView >
        );
    } else {
        return <View>
            <Text>First take a photo</Text>
        </View>
    }
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        top: 120
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38c172',
    },
    input: {
        position: 'absolute',
        height: 40,
        width: 200,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        top: 30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38c172',
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
        width: 200,
        height: 200
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
        bottom: 100,
        margin: 20
    }
})

export default Upload;