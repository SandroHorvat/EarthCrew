import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Headline, Paragraph, TextInput, Button, Snackbar, Portal } from 'react-native-paper';

// Request API.
// Add your own code here to customize or restrict how the public can register new users.

const Register = () => {

    const [identifier, setIdentifier] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const register = () => {
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
    }

    return <View>
        <View style={styles.header}>
            <Headline style={styles.appTitle}>EarthCrew</Headline>
            <Paragraph style={styles.appDesc}>
                Register to access the EarthCrew.
            </Paragraph>
        </View>

        <>
            <View style={styles.divider} />
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                label="Email"
                placeholder="*Username or email">
            </TextInput>
        </>
        <>
            <View style={styles.divider} />
            <TextInput
                value={identifier}
                onChangeText={text => setIdentifier(text)}
                label="Username"
                placeholder="*Username">
            </TextInput>
        </>

        <>
            <View style={styles.divider} />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                label="Password"
                placeholder="*Password"
                secureTextEntry>
            </TextInput>
        </>


        <Button onPress={() => {
            register()
        }}><Text>Register</Text></Button>
    </View>
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    divider: {
        height: 16,
    },
    headline: {
        fontSize: 30,
    },
    appDesc: {
        textAlign: 'center',
    },
    header: {
        marginTop: 55,
        padding: 32,
    },
    appTitle: {
        textAlign: 'center',
        fontSize: 35,
        lineHeight: 35,
        fontWeight: '700',
    },
    btn: {
        height: 50,
        paddingTop: 6
    },
});

export default Register;