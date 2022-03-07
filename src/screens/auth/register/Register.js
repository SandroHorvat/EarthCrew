"use strict"

import axios from 'axios';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Headline, Paragraph, TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Tooltip from 'react-native-walkthrough-tooltip';
import PasswordStrengthMeter from '../../../components/general/PasswordStrengthMeter';
import Icon from 'react-native-vector-icons/FontAwesome';

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
const Register = ({ navigation }) => {

    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showTip, setTip] = useState(false);
    const [visible, setVisible] = useState(false);
    const icon = !visible ? 'eye-slash' : 'eye';

    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    /**
    * 
    zxcvbn is a password strength estimator inspired by password crackers. Through pattern matching and conservative estimation, it recognizes and weighs 30k common passwords, 
    common names and surnames according to US census data, popular English words from Wikipedia and US television and movies, and other common patterns like dates, repeats (aaa), 
    sequences (abcd), keyboard patterns (qwertyuiop), and l33t speak.
    
    Consider using zxcvbn as an algorithmic alternative to password composition policy — it is more secure, flexible, and usable when sites require a minimal complexity score in place 
    of annoying rules like "passwords must contain three of {lower, upper, numbers, symbols}".
    */

    const register = () => {
        //All field required to fill out
        if (!identifier || !email || !password) {
            showToastFailed()

        } else if (!validEmail.test(email)) {
            showToastEmailWrong()
        }
        else if (password.length < 6) {
            showToastPasswordTooShort()
        }
        else {
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
    }

    const showToast = () => {
        {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your account was succesfully registered 👋'
            })
        }
    }

    const showToastFailed = () => {
        {
            Toast.show({
                type: "error",
                text1: 'Fields',
                text2: 'All fields must be outfilled ❌'
            })
        }
    }

    const showToastEmailWrong = () => {
        {
            Toast.show({
                type: "error",
                text1: 'Email',
                text2: 'Email type is not valid ❌'
            })
        }
    }

    const showToastPasswordTooShort = () => {
        {
            Toast.show({
                type: "error",
                text1: 'Password',
                text2: 'Password is too short ❌'
            })
        }
    }

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

            <SafeAreaView>
                <ScrollView>
                    <Button onPress={() => { navigation.goBack() }} style={styles.backButton}><Text>Back</Text></Button>

                    <View style={styles.header}>
                        <Headline style={styles.appTitle}>EarthCrew</Headline>
                        <Paragraph style={styles.appDesc}>
                            Register to access the EarthCrew.
                        </Paragraph>
                    </View>

                    <TextInput
                        style={{ height: 60, marginBottom: 28, backgroundColor: '#e3e3e3' }}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        label="*Email"
                        underlineColor="transparent" >
                    </TextInput>

                    <TextInput
                        style={{ height: 60, marginBottom: 28, backgroundColor: '#e3e3e3' }}
                        value={identifier}
                        onChangeText={text => setIdentifier(text)}
                        label="*Username"
                        underlineColor="transparent" >
                    </TextInput>

                    <View style={styles.containerPassword}>
                        <TextInput
                            style={{ height: 60, flex: 1, alignSelf: 'stretch', paddingHorizontal: 10, backgroundColor: '#e3e3e3' }}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            secureTextEntry={!visible}
                            label="*Password"
                            underlineColor="transparent"
                        />
                        <Icon
                            name={icon}
                            size={20}
                            color={'#9e9e9e'}
                            onPress={() => setVisible(!visible)}
                            style={[styles.icons, { height: 60, width: 30 }]}
                        />
                    </View>

                    <PasswordStrengthMeter password={password} />

                    <Button style={styles.registerButton} onPress={() => { register() }}><Text>Register</Text></Button>

                    <Toast />

                    <Tooltip
                        isVisible={showTip}
                        content={<Text>
                            We have no special password guidelines but we consider you to create a password with this rules:{"\n"}{"\n"}
                            • A mixture of both uppercase and lowercase letters{"\n"}
                            • A mixture of letters and numbers{"\n"}
                            • Inclusion of at least one special character, e.g., ! @ # ? ]{"\n"}{"\n"}
                            The only fixed password rule is that the password must have at least 6 characters.</Text>}
                        placement="center"
                        tooltipStyle
                        onClose={() => setTip(false)}
                        // below is for the status bar of react navigation bar
                        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}>
                        <TouchableOpacity
                            style={styles.infoBox}
                            onPress={() => setTip(true)}>
                            <Text>Information</Text>
                        </TouchableOpacity>
                    </Tooltip>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({

    appDesc: {
        textAlign: 'center'
    },
    appTitle: {
        textAlign: 'center',
        fontSize: 35,
        lineHeight: 35,
        fontWeight: '700',
    },
    backButton: {
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: 80
    },
    registerButton: {
        borderRadius: 4,
        margin: 30
    },
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff'
    },
    containerPassword: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: '#e3e3e3',
    },
    header: {
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 70
    },
    icons: {
        backgroundColor: '#e3e3e3',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    infoBox: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'green',
        width: 85,
        height: 38,
        padding: 10,
        borderRadius: 4
    }
});

export default Register;