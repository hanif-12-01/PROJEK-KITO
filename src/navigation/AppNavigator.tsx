import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import CreateTournamentScreen from '../screens/admin/CreateTournamentScreen';
import TournamentDetailScreen from '../screens/TournamentDetailScreen';
import BracketScreen from '../screens/BracketScreen';
import TeamScreen from '../screens/TeamScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#6b7280',
      tabBarStyle: {
        backgroundColor: '#1f2937',
        borderTopColor: '#374151',
      },
      headerStyle: {
        backgroundColor: '#1f2937',
      },
      headerTintColor: '#ffffff',
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'Beranda',
      }}
    />
    <Tab.Screen 
      name="Tournaments" 
      component={TournamentsScreen}
      options={{
        title: 'Turnamen',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        title: 'Profil',
      }}
    />
  </Tab.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AdminDashboard" 
      component={AdminDashboardScreen}
      options={{ title: 'Dashboard Admin' }}
    />
    <Stack.Screen 
      name="CreateTournament" 
      component={CreateTournamentScreen}
      options={{ title: 'Buat Turnamen' }}
    />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MainTabs" 
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="TournamentDetail" 
      component={TournamentDetailScreen}
      options={{ title: 'Detail Turnamen' }}
    />
    <Stack.Screen 
      name="Bracket" 
      component={BracketScreen}
      options={{ title: 'Bagan Turnamen' }}
    />
    <Stack.Screen 
      name="Team" 
      component={TeamScreen}
      options={{ title: 'Detail Tim' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // You can add a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        currentUser.role === 'admin' ? (
          <AdminStack />
        ) : (
          <MainStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;