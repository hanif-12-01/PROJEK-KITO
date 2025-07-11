import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigator from './src/navigation/AppNavigator';

// Dark theme configuration
const theme = {
  colors: {
    primary: '#6C5CE7',
    accent: '#00CEC9',
    background: '#0F0F23',
    surface: '#1A1A2E',
    text: '#FFFFFF',
    placeholder: '#74B9FF',
    disabled: '#636E72',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  dark: true,
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0F0F23"
          translucent={false}
        />
        <AppNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;