import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getCurrentUser, logOut } from '../../../services/authServices'
import { commonStyles } from '../../../CommonStyles';
import UpgradeAnonymous from './UpgradeAnonymous';

export default function LoggedIn() {
    const user = getCurrentUser();
    const isAnonymous = user?.isAnonymous || false;
    const displayName = user?.email ?? (isAnonymous ? 'Guest User' : 'User');

    return (
        <View style={styles.container}>
            <Text style={commonStyles.titleTxt}>{`Welcome, ${displayName}!`}</Text>
            <Text style={commonStyles.labelTxt}>{`You are successfully logged in ${isAnonymous ? 'anonymously' : ''}!`}</Text>
            {isAnonymous && <UpgradeAnonymous />}
            <TouchableOpacity style={styles.btn} onPress={logOut}>
                <Text style={[commonStyles.labelTxt, { color: 'white' }]}>{'LogOut'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: { marginTop: 20, backgroundColor: '#eb4034', padding: 10, borderRadius: 5, paddingHorizontal: 20 }
})
