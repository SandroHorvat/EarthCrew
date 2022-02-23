import { View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import UserModel from '../../../app/models/UserModel';
import { useRecoilState } from 'recoil';
import { userIdState } from '../../../../atoms';
import { Button, Headline, Paragraph, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const [identifier, setIdentifier] = useState("sandro22.11@hotmail.com");
    const [password, setPassword] = useState("1qa1qa1qaILBMS21213!");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userID, setUserID] = useRecoilState(userIdState);
    const icon = !visible ? 'eye-slash' : 'eye';

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
            setUserID(user.identifier)

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
        <View style={styles.container}>

            <View style={styles.header}>
                <Headline style={styles.appTitle}>Enter</Headline>
                <Paragraph>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/pictures/Logo.jpg')} />
                </Paragraph>
            </View>

            <TextInput
                style={{ height: 60, marginVertical: 28, backgroundColor: '#e3e3e3' }}
                value={identifier}
                onChangeText={text => setIdentifier(text)}
                label="*Username or email"
                underlineColor="transparent" >
            </TextInput>

            <View style={styles.containerPassword}>
                <TextInput
                    style={{ height: 60, flex: 1, alignSelf: 'stretch', backgroundColor: '#e3e3e3' }}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder={"Hallo"}
                    secureTextEntry={!visible}
                    label="*Password"
                    underlineColor="transparent"
                />
                <Icon
                    name={icon}
                    color={'#9e9e9e'}
                    onPress={() => setVisible(!visible)}
                    size={20}
                    style={[styles.icons, { height: 70, width: 30 }]}
                />
            </View>

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

        </View>
    );
};

const styles = StyleSheet.create({
    appTitle: {
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 35,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#b5ff9a',
    },
    btn: {
        height: 50,
        paddingTop: 6,
        margin: 5
    },
    containerPassword: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: '#e3e3e3',
        marginBottom: 30
    },
    divider: {
        height: 16,
    },
    headline: {
        fontSize: 30,
    },
    header: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icons: {
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 210,
        height: 50
    }
});
export default Login;