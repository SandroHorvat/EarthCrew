"use strict"

import { View, StyleSheet, SafeAreaView, } from 'react-native'

import Circular from '../../components/general/Circular';

const Data = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Circular />
        </SafeAreaView >
    )
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignContent: 'center',
        backgroundColor: '#b5ff9a',
    },
})

export default Data;
