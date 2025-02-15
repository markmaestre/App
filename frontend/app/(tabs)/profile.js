import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '../../config';

const defaultProfileImage = require('../assets/logo.png');

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.jwtToken);
  const user = useSelector((state) => state.auth.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/screens/login');
    } else if (user) {
     
      setUsername(user.username || '');
      setLocation(user.location || '');
      setPhoneNumber(user.phone_number || '');
      setProfileImage(user.profileImage || null);
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Denied', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditProfile = async () => {
    if (!token) {
      Alert.alert('Error', 'No token found');
      return;
    }
    if (!username || !location || !phoneNumber) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('location', location);
      formData.append('phone_number', phoneNumber);
      if (password) formData.append('password', password);

      if (profileImage && profileImage !== user?.profileImage) {
        const filename = profileImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';
        formData.append('profileImage', { uri: profileImage, name: filename, type });
      }

      const response = await axios.put(`${API_URL}/api/user/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Profile updated successfully!');
      setProfileImage(response.data.user.profileImage);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating your profile.');
      console.error('Profile Update Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage ? { uri: profileImage } : defaultProfileImage} style={styles.profileImage} />
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Username (optional)" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Address (optional)" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Phone Number(optional)" value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput style={styles.input} placeholder="Password (optional)" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#FF7518',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
});
