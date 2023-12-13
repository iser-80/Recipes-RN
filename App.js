import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import { useFonts } from 'expo-font'
import { ThemeProvider } from './src/theme/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-semiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'kalnia': require('./assets/fonts/Kalnia.ttf'),
    'kalnia-semiBold': require('./assets/fonts/Kalnia-SemiBold.ttf'),
    'kalnia-bold': require('./assets/fonts/Kalnia-Bold.ttf'),
  })

   if (!fontsLoaded) {
      return null
   }
   return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
   )
}

