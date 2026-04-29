import { getAuth } from "@react-native-firebase/auth";

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
        await authInstance.signOut();
    } catch (error) {
        throw error;
    }
}

export const getCurrentUser = () => {
    return authInstance.currentUser;
}
