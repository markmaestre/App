import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { logout } from '../../redux/auth/actions'; 
import { useRouter } from 'expo-router';   


export default function HomePage() {
  const { isLoggedIn } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const router = useRouter();  

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        router.push('../screens/home'); 
      }, 0);
      return () => clearTimeout(timer); 
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appTitle}>UserDashboard</Text>
    
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange', 
    marginBottom: 80,
    textAlign: 'center',
  },
  gridContainer: {
    marginBottom: 40,
  },
  topCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#FFA726',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardBottom: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFA726',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 90,
    height: 50,
    marginBottom: 10,
  },
  iconss: {
    width: 60,
    height: 50,
    marginBottom: 10,
  },
  icons: {
    width: 100,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

});







