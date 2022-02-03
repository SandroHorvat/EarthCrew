import React from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// ios-cloud-upload-outline
const { width } = Dimensions.get('window');

const UploadButton = ({ onPress, lang }) => {
    return (
        <Pressable onPress={() => onPress()} style={styles.buttonStyle}>
            <Icon
                name="ios-cloud-upload-outline"
                color="white"
                size={32}
                style={{ marginRight: 20 }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        width: width - 150,
        height: 80,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default UploadButton;