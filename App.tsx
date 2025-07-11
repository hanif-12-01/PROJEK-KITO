import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/utils/theme';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;