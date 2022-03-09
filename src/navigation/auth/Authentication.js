"use strict"

import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splashscreen from '../../components/general/Splashscreen';
import Login from '../../screens/auth/login/Login';
import AppMenu from '../../screens/menu/AppMenu';
import { store } from '../../redux/store/Store';
import Register from '../../screens/auth/register/Register';

const Stack = createNativeStackNavigator();

const Authentication = () => {
    const [isAuth, setIsAuth] = useState(true);

    // on mount subscribe to store event
    React.useEffect(() => {
        store.subscribe(() => {
            setIsAuth(store.getState().jwt ? true : false)
        });
    }, []);

    // Screen options specify the same options for all of the screens in the navigator
    // Initial route name: which screen is showing first when we start the app
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splashscreen'>
                <Stack.Screen
                    name="Splashscreen"
                    options={{ animationEnabled: false, header: () => null }}
                    component={Splashscreen}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Loggen Sie sich bitte ein.'
                    }} />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Registrieren Sie sich bitte.'
                    }} />
                <Stack.Screen
                    name="App"
                    component={AppMenu} />
            </Stack.Navigator>
        </NavigationContainer >
    )
};

export default Authentication;