import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react';
import LoggedIn from './LoggedIn';
import { authInstance, signInWithEmailAndPassword, signUpWithEmailAndPassword } from '../../../services/authServices';
import { onAuthStateChanged } from '@react-native-firebase/auth';

export default function LoginWithEmail() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, user => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, []);

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password');
            return;
        }
        Keyboard.dismiss();
        try {
            const response = isSignUp ?
                await signUpWithEmailAndPassword(email, password) :
                await signInWithEmailAndPassword(email, password)
            if (response?.user) {
                Alert.alert('Success', 'Logged in successfully!', [{ text: 'OK', onPress: () => setLoggedIn(true) }]);
            }
        } catch (error: any) {
            console.error('Error signing in:', error)
            Alert.alert('Login Failed', error.message);
        }
    }

    const onPressSignUp = () => {
        setIsSignUp((p) => !p);
    }

    if (loggedIn) {
        return <LoggedIn />
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            {/* Form Card */}
            <View style={styles.card}>

                {/* Email Field */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor="#A0A0A0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>

                {/* Password Field */}
                <View style={styles.fieldGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Password</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#A0A0A0"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.signInButton} onPress={signIn}>
                    <Text style={styles.signInText}>{isSignUp ? 'Sign up' : 'Sign in'}</Text>
                </TouchableOpacity>

            </View>

            {/* Sign Up Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>{isSignUp ? 'Have an account? ' : 'Don\'t have an account? '}</Text>
                <TouchableOpacity onPress={onPressSignUp}>
                    <Text style={styles.signUpText}>{isSignUp ? 'Sign in' : 'Sign up'}</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F4F0',
        padding: 10
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 24,
    },
    fieldGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        letterSpacing: 0.1,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        overflow: 'hidden',
    },
    inputWrapperFocused: {
        borderColor: '#1A1A1A',
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '400',
    },
    signInButton: {
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 20,
    },
    signInText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#888',
    },
    signUpText: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '600',
    },
})