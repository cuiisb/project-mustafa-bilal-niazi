import React, {useState} from 'react'
import { TouchableOpacity,SafeAreaView, KeyboardAvoidingView,StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {  auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegistrationScreen = () => {
  const navigation = useNavigation()

  const [getRegemail, setRegemail] = useState('')
  const [getRegpassword, setRegpassword] = useState('')
  const [getname, setname] = useState('')

  const handleSignUp = async() => {
    try{
      const user = await createUserWithEmailAndPassword(auth, getRegemail, getRegpassword)
      alert("Successful registration!")
      logger()
    }
    catch(error){
      alert(error.message)
      console.log(`${error}`)
    }
  }
  const showPass=()=>{
    if(getRegpassword==''){
      alert("Empty password field!")
    }
    else{
      alert(`Password: ${getRegpassword}`)
    }
  }
  
  const logger=()=> {
    navigation.navigate(('Service'),{
      useremail: getRegemail
    });
  }

  const checkname = () => {
  if(getname=='' || getname.length>10){
    if(getname==''){
      alert("Username required!")
    }
    if(getname.length>10){
      alert("Username too long!")
    }
    if(getname.length<2 && getname.length!=''){
      alert("Username too short!")
    }
  }
  else{
    handleSignUp()
  }}

    return (
        <SafeAreaView style={styles.container}
        behavior='padding'>
            <View>
                
                <TextInput
                placeholder='User name' placeholderTextColor='gray'
                style={styles.style1}
                value={getname}
                onChangeText={text=> setname(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='Email' placeholderTextColor='gray'
                style={styles.style1}
                value={getRegemail}
                onChangeText={text=> setRegemail(text)}
                style={styles.input}
                />
                <View >
                <TextInput
                placeholder='Password' placeholderTextColor='gray'
                style={styles.style1}
                value={getRegpassword}
                onChangeText={text=> setRegpassword(text)}
                style={styles.input}
                secureTextEntry
                />
                  
                </View>
                <TouchableOpacity style={styles.styleeye}>
                    <MaterialCommunityIcons name="eye" color='black' size={26} onPress={showPass} />
                  </TouchableOpacity>

            <View>
              <TouchableOpacity
              
              onPress={checkname}
              style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
                <Text style={styles.buttonText}>
                  Register!
                </Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.extra}>
            <Text >Already have an account? </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.style1}>
                  Login!
                </Text>
              </TouchableOpacity>
            </View>
            
            </View>
        </SafeAreaView>
    )
}

export default RegistrationScreen

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
