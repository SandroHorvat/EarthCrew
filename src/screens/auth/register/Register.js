"use strict"

import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Headline, Paragraph, TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Tooltip from 'react-native-walkthrough-tooltip';
import PasswordStrengthMeter from '../../../components/general/PasswordStrengthMeter';
import { useTogglePasswordVisibility } from '../../../components/general/useTogglePasswordVisibility';


// Request API.
// Add your own code here to customize or restrict how the public can register new users.
const Register = ({ navigation }) => {

    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showTip, setTip] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

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
        else if (password.length <= 7) {
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

            <ScrollView>

                <Button onPress={() => { navigation.goBack() }} style={styles.backButton}><Text> Go Back</Text></Button>

                <View style={styles.header}>
                    <Headline style={styles.appTitle}>EarthCrew</Headline>
                    <Paragraph style={styles.appDesc}>
                        Register to access the EarthCrew.
                    </Paragraph>
                </View>

                <TextInput
                    style={{ marginBottom: 28 }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    label="*Email">
                </TextInput>

                <TextInput
                    style={{ marginBottom: 28 }}
                    value={identifier}
                    onChangeText={text => setIdentifier(text)}
                    label="*Username">
                </TextInput>


                <TextInput
                    label="Password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={passwordVisibility}
                    value={password} />
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color='#232323' />
                </Pressable>

                <PasswordStrengthMeter password={password} />

                <Button style={styles.button} onPress={() => { register() }}><Text>Register</Text></Button>

                <Toast />

                <Tooltip
                    isVisible={showTip}
                    content={<Text>
                        We have no special password guidelines but we consider you to create a password with this rules:{"\n"}{"\n"}
                        The only fixed rule is that the password must be longer than 6 characters.{"\n"}{"\n"}
                        • A mixture of both uppercase and lowercase letters{"\n"}
                        • A mixture of letters and numbers{"\n"}
                        • Inclusion of at least one special character, e.g., ! @ # ? ]</Text>}
                    placement="center"
                    tooltipStyle
                    onClose={() => setTip(false)}
                    // below is for the status bar of react navigation bar
                    topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}>
                    <TouchableOpacity
                        style={[styles.infoBox, styles.button]}
                        onPress={() => setTip(true)}>
                        <Text>Information</Text>
                    </TouchableOpacity>
                </Tooltip>
            </ScrollView>
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
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: '#b5ff9a'
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
    inputContainer: {
        width: '100%',
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        padding: 14,
        height: 16,
    },
    passmeter: {
        position: 'absolute',
        alignSelf: 'center',
        top: 109
    }
});

export default Register;