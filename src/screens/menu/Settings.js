"use strict"
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, View, Button } from 'react-native';

const Settings = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Button title='Logout' onPress={async () => {
                await AsyncStorage.removeItem("persist:root")
                navigation.navigate("Login")
            }} />
        </View>
    )
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Settings;
