"use strict"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useRecoilState } from 'recoil'
import { userIdState } from '../../../atoms';

const Settings = ({ navigation }) => {

    const [userID] = useRecoilState(userIdState)

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: 'https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png.webp' }} />

            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Logged in with this account: {userID} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Button title='Logout' onPress={async () => {
                            await AsyncStorage.removeItem("persist:root")
                            navigation.navigate("Login")
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#b5ff9a'
    },
    body: {
        marginTop: 40
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    header: {
        backgroundColor: "#b5ff9a",
        height: 200
    }
});

export default Settings;
