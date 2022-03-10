"use strict"

import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const DataDetails = () => {

    const [data, setData] = useState(0);
    const [userData, setUserData] = useState(0);
    const [litterPickedUpData, setLitterPickedUpData] = useState(0);
    const [litterNotPickedUpData, setLitterNotPickedUpData] = useState(0);

    const baseUrl = 'http://178.18.252.126:1337'
    let [fontsLoaded] = useFonts({ Inter_900Black });


    // Load the amount of the litters set state and load new litters every 2 seconds - then show it in the Data Screen
    useEffect(() => {
        let interval
        const getAmountLitters = async () => {
            try {
                axios({
                    method: 'get',
                    url: `${baseUrl}/litters/count`,
                }).then((response) => {
                    setData(response.data);
                }).catch(function (error) {
                    console.log(error)
                })
            } catch (error) {
                console.log("error", error)
            }
        }
        getAmountLitters()

        interval = setInterval(() => {
            getAmountLitters()
        }, 2 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    // Load the amount of the users set state and load new users every 2 seconds - then show it in the Data Screen
    useEffect(() => {
        let interval
        const getAmountUsers = async () => {
            try {
                axios({
                    method: 'get',
                    url: `${baseUrl}/users/count`,
                }).then((response) => {
                    setUserData(response.data);
                }).catch(function (error) {
                    console.log(error)
                })
            } catch (error) {
                console.log("error", error)
            }
        }
        getAmountUsers()

        interval = setInterval(() => {
            getAmountUsers()
        }, 2 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    // Load the amount of the litters which are picked up set state and load new litters every 2 seconds - then show it in the Data Screen
    useEffect(() => {
        let interval
        const getAmountLittersWithStatusPickedUp = async () => {
            try {
                axios({
                    method: 'get',
                    url: `${baseUrl}/litters?pickedUp=true`,
                }).then((response) => {
                    setLitterPickedUpData(response.data.length)
                }).catch(function (error) {
                    console.log(error)
                })
            } catch (error) {
                console.log("error", error)
            }
        }
        getAmountLittersWithStatusPickedUp()

        interval = setInterval(() => {
            getAmountLittersWithStatusPickedUp()
        }, 2 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    // Load the amount of the litters which are not picked up set state and load new litters every 2 seconds - then show it in the Data Screen
    useEffect(() => {
        let interval
        const getAmountLittersWithStatusNotPickedUp = async () => {
            try {
                axios({
                    method: 'get',
                    url: `${baseUrl}/litters?pickedUp=false`,
                }).then((response) => {
                    setLitterNotPickedUpData(response.data.length);
                }).catch(function (error) {
                    console.log(error)
                })
            } catch (error) {
                console.log("error", error)
            }
        }
        getAmountLittersWithStatusNotPickedUp()

        interval = setInterval(() => {
            getAmountLittersWithStatusNotPickedUp()
        }, 2 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.SquareShapeAmountLitters} >
                        <Icon name="trash-o" size={50} color={'black'} />
                        <Text style={styles.textAmountLitters}>
                            {data}
                            {"\n"}Total litters
                        </Text>
                    </View>

                    <View style={styles.SquareShapeAmountLitterPickedUp} >
                        <Icon name="check" size={50} color={'black'} />
                        <Text style={styles.textAmountLitterPickedUp}>
                            {litterPickedUpData}
                            {"\n"}Picked up
                        </Text>
                    </View>
                </View>

                <View>
                    <View style={styles.SquareShapeAmountUser} >
                        <Icon name="user-o" size={50} color={'black'} />
                        <Text style={styles.textAmountUser}>
                            {userData}
                            {"\n"}Users registered
                        </Text>
                    </View>
                    <View style={styles.SquareShapeAmountLitterNotPickedUp} >
                        <Icon name="close" size={50} color={'black'} />
                        <Text style={styles.textAmountLitterNotPickedUp}>
                            {litterNotPickedUpData}
                            {"\n"}Not picked up
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SquareShapeAmountLitters: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#5D7068',
        margin: 10
    },
    SquareShapeAmountUser: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#5D7068',
        margin: 10,
        marginBottom: 10
    },
    SquareShapeAmountLitterPickedUp: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#5D7068',
        margin: 10,
        marginBottom: 10
    },
    SquareShapeAmountLitterNotPickedUp: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#5D7068',
        margin: 10,
        marginBottom: 10
    },
    textAmountLitters: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: 'black',
        marginTop: 20
    },
    textAmountUser: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: 'black',
        marginTop: 20
    },
    textAmountLitterPickedUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: 'black',
        marginTop: 20
    },
    textAmountLitterNotPickedUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: 'black',
        marginTop: 20
    }
})

export default DataDetails;