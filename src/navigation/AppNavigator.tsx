import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList, AdminTabParamList, ParticipantTabParamList } from '../types';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { colors } from '../utils/theme';

// Import screens (to be created)
// import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
// import { ParticipantDashboardScreen } from '../screens/participant/ParticipantDashboardScreen';
// import { TournamentListScreen } from '../screens/TournamentListScreen';
// import { TournamentDetailScreen } from '../screens/TournamentDetailScreen';
// import { CreateTournamentScreen } from '../screens/admin/CreateTournamentScreen';
// import { ProfileScreen } from '../screens/ProfileScreen';
// import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();
const ParticipantTab = createBottomTabNavigator<ParticipantTabParamList>();

// Placeholder components for screens that haven't been created yet
const PlaceholderScreen = ({ title }: { title: string }) => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <h1 style={{ color: colors.textPrimary }}>{title}</h1>
  </div>
);

// Admin Tab Navigator
const AdminTabNavigator = () => {
  return (
    <AdminTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
      }}
    >
      <AdminTab.Screen
        name="Dashboard"
        component={() => <PlaceholderScreen title="Admin Dashboard" />}
        options={{
          tabBarLabel: 'Dashboard',
          // tabBarIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
        }}
      />
      <AdminTab.Screen
        name="Tournaments"
        component={() => <PlaceholderScreen title="Tournaments" />}
        options={{
          tabBarLabel: 'Tournaments',
          // tabBarIcon: ({ color, size }) => <Icon name="tournament" size={size} color={color} />,
        }}
      />
      <AdminTab.Screen
        name="Teams"
        component={() => <PlaceholderScreen title="Teams" />}
        options={{
          tabBarLabel: 'Teams',
          // tabBarIcon: ({ color, size }) => <Icon name="team" size={size} color={color} />,
        }}
      />
      <AdminTab.Screen
        name="Participants"
        component={() => <PlaceholderScreen title="Participants" />}
        options={{
          tabBarLabel: 'Participants',
          // tabBarIcon: ({ color, size }) => <Icon name="users" size={size} color={color} />,
        }}
      />
      <AdminTab.Screen
        name="Settings"
        component={() => <PlaceholderScreen title="Settings" />}
        options={{
          tabBarLabel: 'Settings',
          // tabBarIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
    </AdminTab.Navigator>
  );
};

// Participant Tab Navigator
const ParticipantTabNavigator = () => {
  return (
    <ParticipantTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textPrimary,
      }}
    >
      <ParticipantTab.Screen
        name="Dashboard"
        component={() => <PlaceholderScreen title="Participant Dashboard" />}
        options={{
          tabBarLabel: 'Dashboard',
          // tabBarIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
        }}
      />
      <ParticipantTab.Screen
        name="Tournaments"
        component={() => <PlaceholderScreen title="Tournaments" />}
        options={{
          tabBarLabel: 'Tournaments',
          // tabBarIcon: ({ color, size }) => <Icon name="tournament" size={size} color={color} />,
        }}
      />
      <ParticipantTab.Screen
        name="MyTeam"
        component={() => <PlaceholderScreen title="My Team" />}
        options={{
          tabBarLabel: 'My Team',
          // tabBarIcon: ({ color, size }) => <Icon name="team" size={size} color={color} />,
        }}
      />
      <ParticipantTab.Screen
        name="Profile"
        component={() => <PlaceholderScreen title="Profile" />}
        options={{
          tabBarLabel: 'Profile',
          // tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
        }}
      />
      <ParticipantTab.Screen
        name="Settings"
        component={() => <PlaceholderScreen title="Settings" />}
        options={{
          tabBarLabel: 'Settings',
          // tabBarIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
    </ParticipantTab.Navigator>
  );
};

// Main Stack Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PlaceholderScreen title="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            color: colors.textPrimary,
          },
        }}
      >
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen
              name="Main"
              component={user.role === 'admin' ? AdminTabNavigator : ParticipantTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TournamentDetail"
              component={() => <PlaceholderScreen title="Tournament Detail" />}
              options={{ title: 'Tournament Details' }}
            />
            <Stack.Screen
              name="CreateTournament"
              component={() => <PlaceholderScreen title="Create Tournament" />}
              options={{ title: 'Create Tournament' }}
            />
            <Stack.Screen
              name="EditTournament"
              component={() => <PlaceholderScreen title="Edit Tournament" />}
              options={{ title: 'Edit Tournament' }}
            />
            <Stack.Screen
              name="TeamDetail"
              component={() => <PlaceholderScreen title="Team Detail" />}
              options={{ title: 'Team Details' }}
            />
            <Stack.Screen
              name="CreateTeam"
              component={() => <PlaceholderScreen title="Create Team" />}
              options={{ title: 'Create Team' }}
            />
            <Stack.Screen
              name="EditTeam"
              component={() => <PlaceholderScreen title="Edit Team" />}
              options={{ title: 'Edit Team' }}
            />
            <Stack.Screen
              name="BracketView"
              component={() => <PlaceholderScreen title="Tournament Bracket" />}
              options={{ title: 'Tournament Bracket' }}
            />
            <Stack.Screen
              name="MatchDetail"
              component={() => <PlaceholderScreen title="Match Details" />}
              options={{ title: 'Match Details' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;