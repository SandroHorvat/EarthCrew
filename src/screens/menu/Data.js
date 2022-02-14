
import { View, StyleSheet, SafeAreaView, } from 'react-native'

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
        backgroundColor: '#b5ff9a',
    },
    content: {
        justifyContent: 'center',
    }
})

export default Data;
