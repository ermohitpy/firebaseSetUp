import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginWithEmail from './LoginWithEmail'
import { commonStyles } from '../../../CommonStyles'
import LoginWithPhone from './LoginWithPhone'
import { onAuthStateChanged } from '@react-native-firebase/auth'
import { authInstance } from '../../../services/authServices'
import LoggedIn from './LoggedIn'

interface LoginProps {
    select: {
        status: boolean,
        data: Object | null
    },
}

export default function Login({ select }: LoginProps) {
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

    const renderLoginComponent = () => {
        switch (select?.data?.id) {
            case 0:
                return <LoginWithEmail />
            case 1:
                return <LoginWithPhone />
            // case 2:
            //     return <Text>{'Login Anonymously'}</Text>
            default:
                return (
                    <View style={commonStyles.centeralizedContainer}>
                        <Text style={commonStyles.titleTxt}>{'Comming Soon!!!'}</Text>
                    </View>
                );
        }
    }

    if (loggedIn) {
            return <LoggedIn />
        }

    return (
        <View style={styles.container}>
            {renderLoginComponent()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    }
})
