import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';



export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>

  );
}

