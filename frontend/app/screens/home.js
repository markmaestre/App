import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web' && width > 768;

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/screens/login')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.content, !isWeb && styles.contentMobile]}>
        <View style={[styles.textContainer, !isWeb && styles.textContainerMobile]}>
          <Text style={styles.title}>WELCOME</Text>
        
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    maxWidth: 1200,
  },
  logo: {
    width: 55,
    height: 60,
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  navText: {
    fontSize: 16,
    color: '#6c757d',
  },
  signUpButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signUpText: {
    color: 'black',
    fontSize: 9,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    maxWidth: 1200,
  },
  contentMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContainer: {
    width: '50%',
  },
  textContainerMobile: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'Black',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    color: '#6c757d',
    marginBottom: -10,
  },
  imageContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)', 
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 10,
  },
  imageMobile: {
    width: 300,
    height: 300,
    marginTop: 30,
  },
});
