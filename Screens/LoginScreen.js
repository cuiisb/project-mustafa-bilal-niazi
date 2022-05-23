import React, { useState } from 'react'
import { TouchableOpacity,SafeAreaView,StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = () => {

  const navigation = useNavigation()

  const [getLoginemail, setLoginemail] = useState('')
  const [getLoginpassword, setLoginpassword] = useState('')  

  const handleLogin = async() => {
    try{ 
      const user = await signInWithEmailAndPassword(auth, getLoginemail, getLoginpassword)
      logger()
    }
    catch(error){
      alert(error.message)
      console.log(`${error}`)
    }
  }

  const showPass=()=>{
    if(getLoginpassword==''){
      alert("Empty field!")
    }
    else{
      alert(`Password: ${getLoginpassword}`)
    }
  }

  const logger=()=> {
    {navigation.navigate(('Service'),{
      useremail: getLoginemail
    }
    );
  }}
  

    return (
        <SafeAreaView style={styles.container}
        behavior='padding'>
            <View>
                
                <TextInput style={[styles.style1,styles.input]}
                placeholder='Email' placeholderTextColor='gray'
                value={getLoginemail}
                onChangeText={text=> setLoginemail(text)}
                
                />
                <View >
                <TextInput style={[styles.style1,styles.input]}
                placeholder='Password' placeholderTextColor='gray'
                value={getLoginpassword}
                onChangeText={text=> setLoginpassword(text)}
                
                secureTextEntry
                />
                
                </View><TouchableOpacity style={styles.styleeye}>
                  <MaterialCommunityIcons name="eye" color='black' size={26} onPress={showPass} />
                </TouchableOpacity>
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
            <Text >Don't have an account? </Text>
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
