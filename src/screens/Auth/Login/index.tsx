import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginWithEmail from './LoginWithEmail'
import { commonStyles } from '../../../CommonStyles'

interface LoginProps {
    select: {
        status: boolean,
        data: Object | null
    },
}

export default function Login({ select }: LoginProps) {

    const renderLoginComponent = () => {
        switch (select?.data?.id) {
            case 0:
                return <LoginWithEmail />
            // case 1:
            //     return <Text>{'Login with Phone'}</Text>
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
