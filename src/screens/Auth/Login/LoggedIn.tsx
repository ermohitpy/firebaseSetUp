import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getCurrentUser, logOut } from '../../../services/authServices'
import { commonStyles } from '../../../CommonStyles';

export default function LoggedIn() {

    const user = getCurrentUser();

    return (
        <View style={styles.container}>
            <Text style={commonStyles.titleTxt}>{`Welcome, ${user?.email || 'User'}!`}</Text>
            <Text style={commonStyles.labelTxt}>{`You are successfully logged in!`}</Text>
            <TouchableOpacity style={styles.btn} onPress={logOut}>
                <Text style={[commonStyles.labelTxt,{color:'white'}]}>{'LogOut'}</Text>
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
    btn:{ marginTop: 20,backgroundColor:'#eb4034',padding:10,borderRadius:5,paddingHorizontal:20 }
})
