import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Root from './src/navigations/Root';
import MovieDetail from './src/screens/MovieDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      {/* Tambahkan initialRouteName */}
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen 
          name="Root" 
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}