"use strict"

import { StyleSheet, View } from 'react-native';

const Card = () => {

    const { photo } = route.params;

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#ffffff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
})

export default Card;
