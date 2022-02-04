"use strict"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Upload from './Upload';
import Data from './Data';
import Map from './Map';
import Camera from './Camera';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const AppMenu = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'green',
                tabBarStyle: { backgroundColor: 'transparent' }
            }}>
            <Tab.Screen
                name='Upload'
                component={Upload}
                options={{
                    title: 'Upload', tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='cloud-upload-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
            <Tab.Screen
                name='Camera'
                component={Camera}
                options={{
                    title: 'Camera', tabBarIcon: ({ size, color }) => {
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
                    title: 'Data', tabBarIcon: ({ size, color }) => {
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
                    title: 'Map', tabBarIcon: ({ size, color }) => {
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
                    title: 'Settings', tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name='settings-outline'
                                size={size}
                                color={color} />
                        );
                    }
                }} />
        </Tab.Navigator>
    )
}

export default AppMenu;