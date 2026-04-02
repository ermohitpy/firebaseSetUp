import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllRemoteConfigValues, isNewDashboardEnabled, RemoteConfigMap } from '../services/remoteConfigService';

const RemoteConfigDashboard = () => {
    const [remoteData, setRemoteData] = useState<RemoteConfigMap>({});

    console.log('Is new dashboard enabled:', isNewDashboardEnabled);

    useEffect(() => {
        getAllRemoteConfigValues(setRemoteData);
    }, [])

    console.log('Remote config data in dashboard:', remoteData);

    if (remoteData.show_new_dashboard === 'true') {
        return (
            <View style={[styles.container, styles.newContainer]}>
                <Text>{'New Dashboard'}</Text>
                <Text style={{ textAlign: 'center' }}>{`Welcome Message : ${remoteData?.welcome_message}`}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>{'Old Dashboard'}</Text>
        </View>
    )
}

export default RemoteConfigDashboard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newContainer: {
        backgroundColor: '#e0f7fa',
    }
});
