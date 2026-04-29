import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface HeaderProps {
    onBack: () => void;
    title: string;
}

export default function Header({ onBack,title }: HeaderProps) {

    return (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={{fontSize:24,color:'black'}}>{'<'}</Text>
            <Text style={{fontSize:16,color:'black'}}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backBtn: {
        backgroundColor: 'lightgray',
        padding: 10,
        flexDirection: 'row',
        alignItems:'center',
        gap:5
    },
})
