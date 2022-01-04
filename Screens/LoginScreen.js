import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'

const LoginScreen = () => {
  const navigation = useNavigation()

  const [getusername, setusername] = useState('')
  const [getpassword, setpassword] = useState('')

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(getusername, getpassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.getusername);
      })
      .catch(error => alert(error.message))
  }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
            <View>
                <Text>Home Screen</Text>
                <TextInput
                placeholder='Username'
                value={getusername}
                onChangeText={text=> setusername(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='Password'
                value={getpassword}
                onChangeText={ext=> setpassword(text)}
                style={styles.input}
                />
            </View>
            
            <View>
              <TouchableOpacity
              onPress={handleLogin}
              style={styles.style1}>
                <Text>
                  Login!
                </Text>
              </TouchableOpacity>
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
