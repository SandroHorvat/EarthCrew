import LottieView from 'lottie-react-native';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';

const LoadingMap = () => {

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <LottieView
                    source={require('./PinJump.json')}
                    autoPlay loop />
            </View>
        </SafeAreaView>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#38c172',
        alignSelf: 'center',
        alignItems: 'center'
    }
})

export default LoadingMap;