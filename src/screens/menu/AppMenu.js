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
                tabBarActiveTintColor: 'black',
                tabBarStyle: {
                    backgroundColor: '#9AB0A7'
                }
            }}>
            <Tab.Screen
                name='Upload'
                component={Upload}
                options={{
                    headerShown: false,
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
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='camera-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
            <Tab.Screen
                name='Data'
                component={Data}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='server-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
            <Tab.Screen name='Map'
                component={Map}
                options={{
                    headerShown: false,
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
                    headerShown: false,
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