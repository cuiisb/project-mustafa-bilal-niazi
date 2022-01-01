import React from 'react'
import { KeyboardAvoidingView,StyleSheet, Text, TextInput, View } from 'react-native'

const RegistrationScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
            <View>
                <Text>Home Screen</Text>
                <TextInput
                placeholder='Email'
                value={}
                onChangeText={}
                />
                <TextInput
                placeholder='Password'
                value={}
                onChangeText={}
                />

                
            </View>
        </KeyboardAvoidingView>
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
