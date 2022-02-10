import { useState, useEffect } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import axios from 'axios';

let baseUrl = 'http://178.18.252.126:1337'

const Circular = () => {

    const [data, setData] = useState(0);
    useEffect(() => {
        getAmountLitters()
    }, [])

    const [userData, setUserData] = useState(0);
    useEffect(() => {
        getAmountUsers()
    }, [])

    function getAmountLitters() {
        axios({
            method: 'get',
            url: `${baseUrl}/litters/count`,
        }).then((response) => {
            setData(response.data);
            console.log(JSON.stringify(data))
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
            console.log(JSON.stringify(userData))
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <View>
            <AnimatedCircularProgress
                style={styles.leftUnder}
                size={150}
                width={15}
                fill={data}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
            >
                {
                    (fill) => (
                        <Text style={styles.text}>
                            {data}
                            <Text> {"\n"}Gesammelter Müll bisher</Text>
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
            <AnimatedCircularProgress
                style={styles.rightUnder}
                size={150}
                width={15}
                fill={userData}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                
            >
                {
                    (fill) => (
                        <Text style={styles.text}>
                            {userData}
                            <Text> {"\n"}Anzahl Benutzer</Text>
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
        </View>
    );
}

const styles = StyleSheet.create({
    leftUnder: {
        position: 'absolute',
        top: 350,
        left: 10,
    },
    rightUnder: {
        position: 'absolute',
        top: 350,
        right: 10,
    },
    leftUpon: {
        position: 'absolute',
        top: 140,
        left: 10,
    },
    rightUpon: {
        position: 'absolute',
        top: 140,
        right: 10,
    },
    text: {
        alignContent: 'center'
    }
});

export default Circular;