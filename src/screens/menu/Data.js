import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ViewBase, SafeAreaView, Animated, Text } from 'react-native'

import Circular from '../../components/general/Circular';


const Data = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Circular />
            </View>
        </SafeAreaView >
    )
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38c172',
    },
    content: {
        justifyContent: 'center',
    }
})

export default Data;
