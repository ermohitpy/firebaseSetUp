import { getAuth, signInWithPhoneNumber, signOut } from "@react-native-firebase/auth";
import { Alert } from "react-native";

export const authInstance = getAuth();

export const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const response = await authInstance.signInWithEmailAndPassword(email, password);
        return response;
    } catch (error) {
        throw error;
    }
}

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const response = await authInstance.createUserWithEmailAndPassword(email, password);
        return response;
    } catch (error) {
        throw error;
    }
}

export const logOut = async () => {
    try {
        await signOut(authInstance);
    } catch (error) {
        Alert.alert(error.message || 'Failed to log out. Please try again.');
    }
}

export const getCurrentUser = () => {
    return authInstance.currentUser;
}

export const signInWithPhoneNo = async (phoneNumber: string) => {
    try {
        const confirmationResult = await signInWithPhoneNumber(authInstance, phoneNumber);
        return confirmationResult;
    } catch (error) {
        console.log('Error in signIn:', error);
        Alert.alert(error.message || 'Failed to send OTP. Please try again.');
    }
}

export const confirmOTP = async (confirmationResult: any, otp: string) => {
    try {
        const response = await confirmationResult.confirm(otp);
        return response;
    } catch (error) {
        Alert.alert(error.message || 'Failed to confirm OTP. Please try again.');
    }
}
