import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import { app } from '../firebase'

const LoginScreen = () => {
  const navigation = useNavigation()

  const [getemail, setemail] = useState('')
  const [getpassword, setpassword] = useState('')

  const handleLogin = () => {
    app
      .signInWithEmailAndPassword(getemail, getpassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        {() => navigation.navigate('Service')}
        console.log('Logged in with:', user.getemail);
      })
      .catch(error => alert(error.message))
  }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
            <View>
                
                <TextInput
                placeholder='email'
                value={getemail}
                onChangeText={text=> setemail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='Password'
                value={getpassword}
                onChangeText={text=> setpassword(text)}
                style={styles.input}
                />
            </View>
            
            <View>
              <TouchableOpacity
               onPress={() => navigation.navigate('Service')}
              style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
                <Text  style={styles.buttonText}>
                  Login!
                </Text>
              </TouchableOpacity>
              <View style={styles.extra}>
            <Text >don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}
              >
                <Text style={styles.style1}>
                  Register!
                </Text>
              </TouchableOpacity>
            </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
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
