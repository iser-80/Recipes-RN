import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/welcome'
import Home from '../screens/home'
import Recipe from '../screens/recipe';

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='welcome' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Recipe' component={Recipe} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}