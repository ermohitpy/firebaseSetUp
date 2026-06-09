import { EmailAuthProvider, getAuth, linkWithCredential, signInAnonymously, signInWithPhoneNumber, signOut } from "@react-native-firebase/auth";
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

export const logInAnonymously = async () => {
    try {
        await signInAnonymously(authInstance);
      } catch (e:any) {
        console.log('====> Error in logInAnonymously:', e);
        Alert.alert(e.message || 'Failed to login anonymously. Please try again.');
      }
};

export const upgradeAnonymousUser = async (email: string, password: string) => {
    try {
        const credential = EmailAuthProvider.credential(email, password);
        const user = authInstance.currentUser;
        if (user) {
            await linkWithCredential(user,credential);
            Alert.alert('Success', 'Anonymous account upgraded successfully!', [{ text: 'OK' }]);
        } else {
            Alert.alert('Error', 'No anonymous user found to upgrade.');
        }
    } catch (error:any) {
        console.log('====> Error in upgradeAnonymousUser:', error);
        Alert.alert(error.message || 'Failed to upgrade account. Please try again.');
    }
}