"use strict"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Upload from './Upload';
import Data from './Data';
import Map from './Map';
import Camera from './Camera';
import Settings from './Settings';

const AppMenu = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#19cd21'
                }
            }}>
            <Tab.Screen
                name='Upload'
                component={Upload}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#19cd21',
                    },
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons name='cloud-upload-outline' size={size} color={color} />
                        );
                    }
                }} />
            <Tab.Screen
                name='Camera'
                component={Camera}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#19cd21',
                    },
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='camera-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
            <Tab.Screen name='Data'
                component={Data}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#19cd21',
                    },
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='server-outline'
                                size={size}
                                color={color}
                            />
                        );
                    }
                }} />
            <Tab.Screen name='Map'
                component={Map}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#19cd21',
                    },
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name="map-outline"
                                size={size}
                                color={color} />
                        );
                    }
                }} />
            <Tab.Screen name='Settings'
                component={Settings}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#19cd21',
                    },
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='settings-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
        </Tab.Navigator >
    )
}

export default AppMenu;