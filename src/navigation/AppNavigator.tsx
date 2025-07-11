import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, View} from 'react-native';

import {RootStackParamList, MainTabParamList, User, UserRole} from '../types';
import authService from '../services/authService';

// Import screens (will be created next)
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main app screens
import HomeScreen from '../screens/HomeScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import MyTeamsScreen from '../screens/MyTeamsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Tournament screens
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen';
import CreateTournamentScreen from '../screens/admin/CreateTournamentScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import BracketViewScreen from '../screens/BracketViewScreen';

// Team screens
import TeamProfileScreen from '../screens/TeamProfileScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const AuthStack = createStackNavigator();

// Loading component
const LoadingScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#6C5CE7" />
  </View>
);

// Auth Stack Navigator
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#1A1A2E'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <AuthStack.Screen
        name="AuthMain"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Masuk'}}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Daftar'}}
      />
    </AuthStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = ({userRole}: {userRole: UserRole}) => {
  return (
    <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Tournaments':
              iconName = 'emoji-events';
              break;
            case 'MyTeams':
              iconName = 'group';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          borderTopColor: '#16213E',
        },
        headerStyle: {backgroundColor: '#1A1A2E'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      })}>
      <MainTab.Screen
        name="Home"
        component={userRole === UserRole.ORGANIZER ? AdminDashboardScreen : HomeScreen}
        options={{title: 'Beranda'}}
      />
      <MainTab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{title: 'Turnamen'}}
      />
      {userRole !== UserRole.SPECTATOR && (
        <MainTab.Screen
          name="MyTeams"
          component={MyTeamsScreen}
          options={{title: 'Tim Saya'}}
        />
      )}
      <MainTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{title: 'Notifikasi'}}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profil'}}
      />
    </MainTab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async firebaseUser => {
      setIsLoading(true);
      if (firebaseUser) {
        // Get user data from Firestore
        const userData = await authService.getCurrentUserData();
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#1A1A2E'},
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        {user ? (
          // User is authenticated
          <>
            <RootStack.Screen
              name="Main"
              options={{headerShown: false}}>
              {() => <MainTabNavigator userRole={user.role} />}
            </RootStack.Screen>
            <RootStack.Screen
              name="TournamentDetails"
              component={TournamentDetailsScreen}
              options={{title: 'Detail Turnamen'}}
            />
            <RootStack.Screen
              name="BracketView"
              component={BracketViewScreen}
              options={{title: 'Bagan Turnamen'}}
            />
            <RootStack.Screen
              name="TeamProfile"
              component={TeamProfileScreen}
              options={{title: 'Profil Tim'}}
            />
            <RootStack.Screen
              name="CreateTeam"
              component={CreateTeamScreen}
              options={{title: 'Buat Tim'}}
            />
            {user.role === UserRole.ORGANIZER && (
              <RootStack.Screen
                name="CreateTournament"
                component={CreateTournamentScreen}
                options={{title: 'Buat Turnamen'}}
              />
            )}
          </>
        ) : (
          // User is not authenticated
          <>
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Auth"
              component={AuthStackNavigator}
              options={{headerShown: false}}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;