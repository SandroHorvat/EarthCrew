"use strict"

import axios from 'axios';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Headline, Paragraph, TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Tooltip from 'react-native-walkthrough-tooltip';
import PasswordStrengthMeter from '../../../components/general/PasswordStrengthMeter';

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
const Register = ({ navigation }) => {

    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showTip, setTip] = useState(false);

    /**
    * 
   PassMeter has 5 level of security. It's checks the typed password string has any upper case, lower case, numbers and special characters. Password string can be at least 4 character.
   Strength Level	Description	Example
   0	Length of the password is below then gived or default minLenght	"ac", "A2b", "1&", ...
   1	Password has at least one upper case, lower case, numbers and special characters	"example", "PASSWORD", "%+%&/!", ...
   2	Password contains only two condition of the required	"exAmpLe", "pa22w0rd", "PA\$\$W%RD!", ...
   3	Password contains only three condition of the required	"3xAmpL3", "^!22w0rd&6", "pA\$\$W%RD!", ...
    */

    const register = () => {

        validate()
        axios
            .post('http://178.18.252.126:1337/auth/local/register', {
                username: identifier,
                email: email,
                password: password,
            })
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
        showToast()
    }


    const showToast = () => {
        {
            Toast.show({
                type: 'success',
                text1: 'Successfully registered',
                text2: 'Your account was succesfully registered 👋'
            })
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            <Button onPress={() => { navigation.goBack() }} style={styles.backButton}><Text> Go Back</Text></Button>

            <View style={styles.header}>
                <Headline style={styles.appTitle}>EarthCrew</Headline>
                <Paragraph style={styles.appDesc}>
                    Register to access the EarthCrew.
                </Paragraph>
            </View>

            <View style={styles.divider} />
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                label="Email"
                placeholder="*Username or email">
            </TextInput>

            <View style={styles.divider} />
            <TextInput
                value={identifier}
                onChangeText={text => setIdentifier(text)}
                label="Username"
                placeholder="*Username">
            </TextInput>

            <View style={styles.divider} />

            <TextInput
                label="Password"
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry />


            <PasswordStrengthMeter password={password} />

            <Button onPress={() => { register() }}><Text>Register</Text></Button>

            <Toast />

            <Tooltip
                isVisible={showTip}
                content={<Text>Password</Text>}
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

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    appDesc: {
        textAlign: 'center',
    },
    appTitle: {
        textAlign: 'center',
        fontSize: 35,
        lineHeight: 35,
        fontWeight: '700',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        width: 100,
        height: 100,
    },
    btn: {
        height: 50,
        paddingTop: 6
    },
    button: {
        padding: 10,
        borderRadius: 4
    },
    container: {
        flex: 1
    },
    divider: {
        height: 16,
    },
    headline: {
        fontSize: 30,
    },
    header: {
        marginTop: 100,
        padding: 32,
    },
    infoBox: {
        position: 'absolute',
        alignSelf: 'center',
        top: 70,
        bottom: 100,
        backgroundColor: 'green',
        width: 85,
        height: 38,
        margin: 20
    },
    passmeter: {
        position: 'absolute',
        alignSelf: 'center',
        top: 109
    }
});

export default Register;