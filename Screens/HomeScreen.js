import React from 'react'
import { TouchableOpacity,Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {

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

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'khaki',
      alignItems: 'center',
      justifyContent: 'center',
    },
    italic: {
      fontStyle: 'italic',
      fontSize: 28,
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
  });
