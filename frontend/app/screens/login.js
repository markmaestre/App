import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Image, View } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { setJwtToken } from '../../redux/auth/actions';
import { API_URL } from '../../config';
import { useRouter } from 'expo-router';

export default function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
    
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    
            console.log('Login Success:', response.data);
    
            dispatch(setJwtToken(response.data.token));
    
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome back!',
            });
    
           
            const userRole = response.data.role;
    
            if (userRole) {
                console.log('Role:', userRole);
    
               
                if (userRole.toLowerCase() === 'admin') {
                    console.log('Redirecting to admin dashboard');
                    router.push('/Admin/(tabs)/admin');
                } else {
                    console.log('Redirecting to user dashboard');
                    router.push('/(tabs)');
                }
            } else {
                console.error('Role is not defined in the response data');
                Toast.show({
                    type: 'error',
                    text1: 'Role Missing',
                    text2: 'Your role was not found in the response data.',
                });
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Login Error:', err.response?.data || err.message);
    
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: err.response?.data?.message || 'Failed to login. Please check your credentials.',
                });
            } else {
                console.error('Unexpected Error:', err);
    
                Toast.show({
                    type: 'error',
                    text1: 'Unexpected Error',
                    text2: 'An unexpected error occurred. Please try again.',
                });
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>LOG IN</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
            </TouchableOpacity>

            <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('./signup')}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: '#FF6600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6600',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#FF6600',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerTextContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        fontSize: 16,
        color: '#FF6600',
        fontWeight: '600',
    },
});
