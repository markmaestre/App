import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function AdminDashboard() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('../screens/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`http://192.168.1.44:4000/api/auth/stats`);
        setActiveUsersCount(response.data.activeUsersCount);
        setTotalUsers(response.data.totalUsers || 0);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    setCurrentDate(new Date().toLocaleDateString());
  }, [isLoggedIn, router]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF7043" />
      ) : (
        <View style={styles.mainContent}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <View style={styles.cardsWrapper}>
            <View style={styles.card}>
              <Text style={styles.metricValue}>{activeUsersCount}</Text>
              <Text style={styles.metricLabel}>Active Users</Text>
              <Text style={styles.metricDate}>{currentDate}</Text>
            </View>
          
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D84315',
    marginBottom: 20,
  },
  mainContent: {
    width: '90%',
    alignItems: 'center',
  },
  cardsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  card: {
    width: '45%',
    backgroundColor: '#FF7043',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSecondary: {
    width: '45%',
    backgroundColor: '#FFAB91',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  metricDate: {
    fontSize: 14,
    color: '#FFCCBC',
    textAlign: 'center',
  },
});
