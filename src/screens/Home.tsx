import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationProp } from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
};

export default function Home({ navigation }: HomeScreenProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Detail')} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20, // Add some space between the text and button
  },
});