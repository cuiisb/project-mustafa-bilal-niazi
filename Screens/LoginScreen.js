import React, { useState } from 'react'
import { TouchableOpacity,SafeAreaView,StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

const LoginScreen = () => {

  const navigation = useNavigation()

  const [getLoginemail, setLoginemail] = useState('')
  const [getLoginpassword, setLoginpassword] = useState('')  

  const handleLogin = async() => {
    try{ 
      const user = await signInWithEmailAndPassword(auth, getLoginemail, getLoginpassword)
      
      logger()
      alert("Welcome back sawaar!")
      console.log(user)
      
    }
    catch(error){
      alert(error.message)
      console.log(`${error}`)
    }
  }

  const logger=()=> {
    {navigation.navigate(('Service'),{
      user: getLoginemail
    }
    );
  }}
  

    return (
        <SafeAreaView style={styles.container}
        behavior='padding'>
            <View>
                
                <TextInput
                placeholder='Email'
                style={styles.style1}
                value={getLoginemail}
                onChangeText={text=> setLoginemail(text)}
                style={styles.input}
                />
                
                <TextInput
                placeholder='Password'
                style={styles.style1} 
                value={getLoginpassword}
                onChangeText={text=> setLoginpassword(text)}
                style={styles.input}
                secureTextEntry
                />
        
            
            <View>
              <TouchableOpacity
               onPress={handleLogin}
              style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
                <Text  style={styles.buttonText}>
                  Login!
                </Text>
              </TouchableOpacity>
              </View>
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

        </SafeAreaView>
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
    backgroundColor: 'chartreuse',
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
