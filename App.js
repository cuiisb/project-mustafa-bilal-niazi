import { StatusBar } from 'expo-status-bar';
import {TouchableOpacity, ScrollView, Text, View, StyleSheet,Button } from 'react-native';
import React, {useState} from'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ServiceScreen  from './Screens/ServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'Saath Sawaar!',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{
      title: 'Register as a sawaar!',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{
      title: 'Welcome back sawaar!',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }}/>
        <Stack.Screen name="Service" component={ServiceScreen} options={{
        headerShown: false
      
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style1: {
    borderBottomWidth: 2,
    paddingTop: 20
  },
  style2: {
    paddingTop: 30,
    alignContent: 'space-between'
  },
  style3: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '50%',
    alignContent: "center",
    fontWeight: 'bold',
  },
  style4: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignContent: "center"
  },
  button: {
    paddingTop: 10,
    borderRadius: 50,
    textAlign: 'center'
  }
});
