import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { logInAnonymously } from '../../../services/authServices';

export default function LoginAnonymous() {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={logInAnonymously}>
                <Text style={styles.btn}>{'Login Anonymously'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: { color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }
})