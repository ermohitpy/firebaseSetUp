import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { emailStyles } from './LoginWithEmail';
import { upgradeAnonymousUser } from '../../../services/authServices';

export default function UpgradeAnonymous() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onPressUpgrade = () => {
        upgradeAnonymousUser(email, password);
    }

    return (
        <KeyboardAvoidingView
            style={[emailStyles.container,{backgroundColor:'transparent'}]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            {/* Form Card */}
            <View style={[emailStyles.card,{width:300,height:400}]}>

                <Text style={{textAlign:'center',fontSize:18,fontWeight:'semibold',marginBottom:30}}>{'Upgrade Anonymous Account'}</Text>

                {/* Email Field */}
                <View style={emailStyles.fieldGroup}>
                    <Text style={emailStyles.label}>Email address</Text>
                    <View style={emailStyles.inputWrapper}>
                        <TextInput
                            style={emailStyles.input}
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
                <View style={emailStyles.fieldGroup}>
                    <View style={emailStyles.labelRow}>
                        <Text style={emailStyles.label}>Password</Text>
                    </View>
                    <View style={emailStyles.inputWrapper}>
                        <TextInput
                            style={emailStyles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#A0A0A0"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={emailStyles.signInButton} onPress={onPressUpgrade}>
                    <Text style={emailStyles.signInText}>{'Upgrade Account'}</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}
