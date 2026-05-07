import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { confirmOTP, signInWithPhoneNo } from '../../../services/authServices';

export default function LoginWithPhone() {
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
    const [confirmationResult, setConfirmationResult] = useState<any>(null);

    const handleSendOTP = async () => {
        console.log('Phone number entered:', phoneNumber);
        if (!phoneNumber) {
            Alert.alert('Please enter a valid phone number');
            return;
        }
        setLoading(true);
        const res = await signInWithPhoneNo(phoneNumber);
        console.log('OTP sent response:', res);
        if (res) {
            setShowOtpInput(true);
            setConfirmationResult(res);
            setPhoneNumber('');
        }
        setLoading(false);
    }

    const handleConfirmOTP = async () => {
        if (phoneNumber.length !== 6) {
            Alert.alert('Please enter a valid 6 digit OTP');
            return;
        }
        setLoading(true);
        const res = await confirmOTP(confirmationResult, phoneNumber);
        console.log('OTP confirmation response:', res);
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text style={styles.titleTxt}>{showOtpInput ? 'Enter OTP Here' : 'Enter Your Mobile No. With Country Code'}</Text>
            <TextInput
                style={styles.inputBox}
                placeholder={showOtpInput ? 'Enter 6 digit otp' : 'Mobile No. Eg. +919999999999'}
                keyboardType='phone-pad'
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                maxLength={showOtpInput ? 6 : 15}
                editable={!loading}
            />
            <TouchableOpacity disabled={loading} onPress={showOtpInput ? handleConfirmOTP : handleSendOTP}>
                {loading ? <ActivityIndicator /> : <Text style={styles.btn}>{showOtpInput ? 'Verify OTP' : 'Send OTP'}</Text>}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTxt: { color: 'black', fontSize: 18 },
    inputBox: { borderWidth: 1, borderColor: 'gray', width: '80%', padding: 10, marginVertical: 20, color: 'black' },
    btn: { color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }


})
