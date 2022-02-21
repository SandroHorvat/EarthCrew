"use strict"

import React, { useState } from 'react';
import { Alert, StyleSheet, Image, Text, TouchableOpacity, TextInput, SafeAreaView, Switch, Dimensions, Modal } from 'react-native';
import { Card } from 'react-native-elements'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Tooltip from 'react-native-walkthrough-tooltip';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';

import { switchState, valueItemsState } from '../../../atoms';
import { useRecoilState } from 'recoil';

const Upload = ({ route, navigation: { setParams } }) => {

    // When photo is present
    if (route.params?.photo) {
        const { photo, location, isDisabled, sendStatus, text } = route.params;
        const [pickedUp, setPickedUp] = useRecoilState(switchState);
        const [modalOpen, setModalOpen] = useState(false);
        const [showTip, setTip] = useState(false);
        const [open, setOpen] = useState(false);
        const [value, setValue] = useRecoilState(valueItemsState);
        const [items, setItems] = useState([
            { label: 'Aluminium', value: 'Aluminium' },
            { label: 'Cigarettes', value: 'Cigarettes' },
            { label: 'Glasses', value: 'Glasses' },
            { label: 'Metal', value: 'Metal' },
            { label: 'Organic waste', value: 'Organic waste' },
            { label: 'Plastic', value: 'Plastic' },
        ]);

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
                    pickedUp: pickedUp,
                    category: value
                })
            } else
                return (
                    <Text>Error</Text>
                )
        }

        // Switcher for picked up or not picked up
        const toggleSwitch = () => {
            setPickedUp(!pickedUp);
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
                    <SafeAreaView >
                        <AntDesign style={{ fontSize: 30, color: "green" }} name="checkcircleo" size={24} color="black" />
                        <Text>Litter successfully send </Text>
                    </SafeAreaView >
                )

            } else if (isDisabled == false) {
                return (
                    <SafeAreaView >
                        <AntDesign style={{ fontSize: 24, color: "red" }} name="closesquareo" size={22} color="black" />
                        <Text>Litter not send yet</Text>
                    </SafeAreaView>
                )
            }
        }

        const confirmLitterSendDialog = () => {
            Alert.alert(
                "Submit post",
                "Are you sure you want to post this litter?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            reportLitter();
                            setParams({
                                isDisabled: (true)
                            })
                            showToast()
                        }
                    }
                ]
            );
        };


        // onRequestClose for Android User
        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <Animatable.Image animation={"zoomIn"} iterationCount={"infinite"} direction="alternate-reverse" style={styles.photo} source={{ uri: photo.uri }} easing={"ease"} />
                </TouchableOpacity>

                <Modal visible={modalOpen} animationType='slide' onRequestClose={() => setModalOpen(false)}>

                    <SafeAreaView style={styles.modalContainer}>

                        <SafeAreaView style={styles.modalCloseContainer}>
                            <Ionicons
                                name='close'
                                size={25}
                                onPress={() => setModalOpen(false)} />
                        </SafeAreaView>

                        <SafeAreaView style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={text}
                                onChangeText={(text) => setParams({
                                    text: text
                                })}
                                placeholder="Type some descriptions in"
                                keyboardType='default' />
                        </SafeAreaView>

                        <SafeAreaView style={styles.cardContainer}>
                            <Card>
                                <Text >{pickedUp ? "Picked up" : "Not picked up"}  </Text>
                            </Card>

                            <Card>
                                {litterAlreadySent()}
                            </Card>
                        </SafeAreaView>


                        <SafeAreaView style={styles.modalPhotoContainer}>
                            <Image style={styles.modalPhoto} source={{ uri: photo.uri }} />
                        </SafeAreaView>

                        <SafeAreaView style={styles.switchContainer}>
                            <Switch
                                style={styles.switch}
                                trackColor={{ false: "#ff0000", true: "#00ff00" }}
                                thumbColor={pickedUp ? "#006400" : "#800000"}
                                ios_backgroundColor="#ff0000"
                                onValueChange={toggleSwitch}
                                value={pickedUp} />
                        </SafeAreaView>

                        <SafeAreaView style={styles.dropdownContainer}>
                            <DropDownPicker
                                style={styles.dropdown}
                                containerStyle={{ width: 140 }}
                                placeholder="Select an item"
                                open={open}
                                value={value}
                                items={items}
                                dropDownDirection='BOTTOM'
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems} />
                        </SafeAreaView>

                        <Toast />

                        <SafeAreaView style={styles.toolTipContainer}>
                            <Tooltip
                                isVisible={showTip}
                                content={<Text>At the top you can write the type of the litter in. Then please give the litter a status and a category. Did you picked it up or not ?</Text>}
                                placement="top"
                                onClose={() => setTip(false)}
                                // below is for the status bar of react navigation bar
                                topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}>
                                <TouchableOpacity
                                    style={[styles.toolTipBox, styles.button]}
                                    onPress={() => setTip(true)}>
                                    <Text>Information</Text>
                                </TouchableOpacity>
                            </Tooltip>
                        </SafeAreaView>

                        <SafeAreaView style={styles.sendButtonContainer}>
                            <TouchableOpacity
                                activeOpacity={10}
                                disabled={isDisabled}
                                onPress={() => confirmLitterSendDialog()} >
                                < Ionicons
                                    color="green"
                                    name="send-outline"
                                    size={SCREEN_HEIGHT * 0.07} />
                            </TouchableOpacity>
                        </SafeAreaView>

                    </SafeAreaView>

                </Modal >
            </SafeAreaView >
        );
    } else {
        return <SafeAreaView style={styles.container}>
            <Text style={{ margin: 20, fontSize: 30 }}>First take a photo</Text>
            <AntDesign name="camerao" size={100} color="black" />
        </SafeAreaView>
    }
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 4
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b5ff9a',
    },
    dropdownContainer: {
        alignSelf: 'center',
        zIndex: 1
    },
    dropdown: {
        width: 140,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "green"
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    input: {
        height: 40,
        width: 200,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "green"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#b5ff9a',
    },
    modalCloseContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        marginTop: 10,
        marginRight: 10
    },
    modalPhotoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    modalPhoto: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    photo: {
        borderRadius: 10,
        width: 250,
        height: 250,
    },
    sendButtonContainer: {
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10
    },
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    switch: {
        margin: 40
    },
    toolTipContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 50
    },
    toolTipBox: {
        backgroundColor: 'green',
        width: 85,
        height: 38,
    }
})

export default Upload;