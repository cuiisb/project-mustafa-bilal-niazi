import React, {useState} from 'react'
import { TouchableOpacity,SafeAreaView, KeyboardAvoidingView,StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {  auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const trainer = () => {
  const navigation = useNavigation()

  return (
        
    <View style={styles.container}>
        <Text style={styles.italic}>Hey! </Text>
        <Text style={styles.italic}>Want to get fitter!??</Text>
        <Text style={styles.italic}>and</Text>
        <Text style={styles.italic}>Dont have an account?</Text>
        <Text style={styles.italic}>Register now!</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
      onPress={() => navigation.navigate('Registration')}
      style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
        <Text style={styles.buttonText}>
          Register!
        </Text>
      </TouchableOpacity>
      <Text style={styles.italic}>Or login to your account!</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
        <Text style={styles.buttonText}>
          Login!
        </Text>
      </TouchableOpacity>
        </View>
   
        
    </View>
)
  }

export default trainer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'chartreuse',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    styleeye: {
      backgroundColor:'chartreuse' ,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 10,
      marginTop: 5,
      width: 27,
      alignSelf: 'center'
    },
    style1: {
        borderBottomWidth: 2,
        fontStyle: 'italic',
        
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
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button2: {
        backgroundColor: 'green',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'green',
        marginTop: 5,
        borderColor: 'goldenrod',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      extra: {
        flexDirection: 'row',
        paddingTop: 10,
      },
  });