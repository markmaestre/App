import { StyleSheet, TextInput, TouchableOpacity, Text, Image, ActivityIndicator, View } from 'react-native';
import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config'; 
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router'; 

export default function RegisterForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const router = useRouter();

  const validateFields = () => {
    let newErrors = {};
    if (!username) newErrors.username = 'Full Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!location) newErrors.location = 'address is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    else if (!/^\d{10,15}$/.test(phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        location,
        phone_number: phoneNumber,
        password,
      });

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Account created successfully.',
      });

      router.push('./login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed.';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Full Name" onChangeText={setUsername} value={username} autoCapitalize="words" />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" autoCapitalize="none" />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput style={styles.input} placeholder="Address" onChangeText={setLocation} value={location} autoCapitalize="words" />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <TextInput style={styles.input} placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="phone-pad" autoCapitalize="none" />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

        <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry autoCapitalize="none" />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>
      <Text style={styles.orText}>- OR -</Text>
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('./login')}>
          <Text style={styles.signInLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 160,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6600',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6600',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 15,
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  footerText: {
    fontSize: 15,
    color: 'black',
  },
  signInLink: {
    fontSize: 15,
    color: '#FF6600',
    fontWeight: 'bold',
  },
});