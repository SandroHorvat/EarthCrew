import { useState, useEffect } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const DataDetails = () => {

    const [data, setData] = useState(0);
    const [userData, setUserData] = useState(0);
    const baseUrl = 'http://178.18.252.126:1337'
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });


    useEffect(() => {
        getAmountLitters()
        getAmountUsers()
    }, [])

    function getAmountLitters() {
        axios({
            method: 'get',
            url: `${baseUrl}/litters/count`,
        }).then((response) => {
            setData(response.data);
        }).catch(function (error) {
            console.log(error)
        })
    }

    function getAmountUsers() {
        axios({
            method: 'get',
            url: `${baseUrl}/users/count`,
        }).then((response) => {
            setUserData(response.data);
        }).catch(function (error) {
            console.log(error)
        })
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.SquareShapeAmountLitters}>
                    <Icon name="trash-o" size={50} color={'#4981f7'} />
                    <Text style={styles.textAmountLitters}>
                        {data}
                        {"\n"}Total litters
                    </Text>

                </View>

                <View style={styles.SquareShapeAmountUser}>
                    <Icon name="user-o" size={50} color={'#ff5d1d'} />
                    <Text style={styles.textAmountUser}>
                        {userData}
                        {"\n"}Users registered
                    </Text>
                </View>

            </SafeAreaView >
        );
    }
};
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    SquareShapeAmountLitters: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#a8c4ff',
        margin: 30
    },
    SquareShapeAmountUser: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: '#ff956c',
        margin: 20
    },
    textAmountLitters: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: '#4981f7',
        marginTop: 20
    },
    textAmountUser: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: 'Inter_900Black',
        color: '#ff5d1d',
        marginTop: 20
    }
})

export default DataDetails;