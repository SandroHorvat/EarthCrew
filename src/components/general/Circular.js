import { useState, useEffect } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
            console.log("Amount of litters " + JSON.stringify(data))
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

    return (
        <SafeAreaView style={styles.container}>

            <SafeAreaView style={styles.circle}>
                <AnimatedCircularProgress
                    size={150}
                    width={15}
                    fill={data}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        () => (
                            <Text >
                                {data}
                                <Text> {"\n"}Gesammelter Müll bisher</Text>
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>

                <AnimatedCircularProgress
                    size={150}
                    width={15}
                    fill={userData}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        () => (
                            <Text>
                                {userData}
                                <Text> {"\n"}Anzahl Benutzer</Text>
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>

            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    circle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignContent: 'center',
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15
    }
});

export default Circular;