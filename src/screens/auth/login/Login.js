import { View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import UserModel from '../../../app/models/UserModel';
import { Headline, Paragraph, TextInput, Button, Snackbar, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState("sandro22.11@hotmail.com");
    const [password, setPassword] = useState("1qa1qa1qaILBMS21213!");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null)

    const storeData = async (user) => {
        try {
            await AsyncStorage.setItem('Login-Data', user)
            console.log("Erfolgreich gesetzt im Login Screen")
        } catch (e) {
            // saving error
            console.log(user)
        }
    }

    const validateInput = () => {

        let errors = false;

        if (!identifier || identifier.length === 0) {
            errors = true;
        }
        if (!password || password.length === 0) {
            errors = true;
        }
        return !errors;
    };

    const authenticateUser = async () => {
        if (validateInput()) {
            setLoading(true);
            const user = new UserModel(identifier, password);
            setUser(user.identifier)
            storeData(user)
            try {
                if (await user.login()) {
                    navigation.navigate("App", { screen: 'Camera' })
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                setVisible(true);
                setLoading(false);
            }
        } else {
            setError('Please fill out all *required fields');
            setVisible(true);
            setLoading(false);
        }
    };

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Headline style={styles.appTitle}>Enter Earthcrew </Headline>
                <Paragraph style={styles.appDesc}>
                    <Image
                        style={styles.logo}
                        source={require('./Logo.jpg')} />
                </Paragraph>
            </View>

            <TextInput
                style={{ marginVertical: 28 }}
                value={identifier}
                onChangeText={text => setIdentifier(text)}
                label="*Username or email">
            </TextInput>

            <TextInput
                style={{ marginBottom: 28 }}
                value={password}
                onChangeText={text => setPassword(text)}
                label="*Password"
                secureTextEntry>
            </TextInput>

            <Button
                loading={loading}
                disabled={loading}
                style={styles.btn}
                onPress={() => authenticateUser()}
                mode="contained">
                Login
            </Button>
            <Button
                loading={loading}
                disabled={loading}
                style={styles.btn}
                onPress={() => navigation.navigate("Register")}
                mode="contained">
                Register
            </Button>
            <View style={styles.divider} />
            <Portal>
                <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
                    {error}
                </Snackbar>
            </Portal>
        </View>
    );
};

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
        justifyContent: 'center',
        alignSelf: 'center',
    },
    appTitle: {
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 35,
        fontWeight: '700',
    },
    btn: {
        height: 50,
        paddingTop: 6,
        margin: 5
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 210,
        height: 50
    }
});
export default Login;
