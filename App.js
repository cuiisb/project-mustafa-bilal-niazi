import { StatusBar } from 'expo-status-bar';
import {TouchableOpacity, ScrollView, Text, View, StyleSheet,Button } from 'react-native';
import React from'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ServiceScreen  from './Screens/ServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'DISCOUNT APP',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{
      title: 'DISCOUNT APP',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{
      title: 'DISCOUNT APP',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }}/>
        <Stack.Screen name="Service" component={ServiceScreen} options={{
      title: 'DISCOUNT APP',
      headerStyle: {
        backgroundColor: 'seagreen',
      },
      headerTintColor: 'khaki',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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
