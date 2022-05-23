import React, { useState } from 'react'
import { RefreshControl, TouchableOpacity,SafeAreaView ,TextInput,Pressable, Modal ,Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged,  signOut} from 'firebase/auth'
import { auth } from '../firebase';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { db } from '../firebase-cruds';
import {collection, doc, updateDoc, addDoc, getDocs, deleteDoc} from 'firebase/firestore'
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();


function ServiceScreen  ({route}) {

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const {useremail}=route.params;
  const userpassedID=JSON.stringify(useremail);
  const [users,setusers]=useState([])
  const usersrefdb=collection(db, 'users')
  
  useEffect(() => {
    const getusers = async () =>{
      const data= await getDocs(usersrefdb)
      console.log(data)
      setusers(data.docs.map((doc)=>({...doc.data(), id: doc.id })));

    }
    getusers()
  }, [])

  



  const [getUser, setUser]= useState({})
  onAuthStateChanged( auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleLogout = async() => {
    await signOut(auth)
  }
  const delogger=()=>{
    handleLogout
    {navigation.navigate('Login')}
  }
  
  function Profile({navigation}) {
  
    const [Weight,setWeight]=useState('')
    const [Height,setHeight]=useState('')
    const [BMI, setBMI]=useState('')
    const [BMIresult, setBMIresult]=useState('')

    const calculate = (height, weight) => {
      //calculation
      var result = (parseFloat(weight)*10000)/(parseFloat(height)*parseFloat(height));
      result = result.toFixed(2);
      setBMI(result)
      //display result
      if(result<18.5){
         setBMIresult('Underweight')
      }
      else if(result>=18.5&&result<25){
        setBMIresult('Normal weight')
      }
      else if(result>=25&&result<30){
        setBMIresult('Overweight')
      }
      else if(result>=30){
        setBMIresult('Obese')
      }
      else{
         alert('Incorrect Input!');
         setBMIresult('')
         
      }
   }

    return (
        <View style={styles.container}>
          <View style={styles.container3}>
          <SimpleLineIcons name="picture" color='black' size={44} />
          <Text style={{color: 'black', fontStyle: 'bold'}}>User Email: {userpassedID}</Text>
          <Text>Height</Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Height (Cm)"
               autoCapitalize = "none"
               value={Height}
               onChangeText={text=> setHeight(text)}/>

          <Text>Weight</Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Weight (Kg)"
               autoCapitalize = "none"
               value={Weight}
               onChangeText={text=> setWeight(text)}/>

          <TouchableOpacity
              onPress={() => calculate(Height, Weight)}
              style={[styles.button2,styles.buttonOutline,{marginTop:20},{width: 150}]}>
                <Text style={styles.buttonText}>
                  Calculate
                </Text>
              </TouchableOpacity>

          <Text style = {styles.output112}>User Body Mass Index (BMI): {BMI}</Text>
          <Text style = {styles.resultText}>{BMIresult}</Text>

          <TouchableOpacity
              onPress={() => {delogger}}
              style={[styles.button2,styles.buttonOutline,{marginTop:20},{width: 150}]}>
                <Text style={styles.buttonText}>
                  Logout
                </Text>
              </TouchableOpacity>

          
          
          </View>
          
        </View>
      );
    }

function Planner({navigation}) {
  return (
    <View style={styles.container}>
        
    <View style={styles.buttonContainer}>
    <TouchableOpacity
  onPress={() => navigation.navigate('Workouts')}
  style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
    <Text style={styles.buttonText}>
        Workout Plans
    </Text>
    
  </TouchableOpacity>
  <Text style={styles.italic}>Or login to your account!</Text>
  <TouchableOpacity
  onPress={() => navigation.navigate('Meals')}
  style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
    <Text style={styles.buttonText}>
        Meal Plans
    </Text>
  </TouchableOpacity>
    </View>

    
</View>
      
    );
        
      }

function VRtrainer({navigation}) {

  return (
    <SafeAreaView style={styles.container}
        behavior='padding'>
            <View>
            <View style={{alignSelf:'center', width: '70%'}}>


                
            </View>
            </View>
        </SafeAreaView>
      
    );
    
  }

  const navigation = useNavigation()
    return (
      
      <Tab.Navigator>
        
      <Tab.Screen name="Fitness Plans" component={Planner} options={{
          tabBarActiveBackgroundColor: 'black',
          tabBarLabel: 'Plans',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="heart-plus" color='red' size={26} />
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',

          headerTintColor: 'palegoldenrod',
        }}  />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarActiveBackgroundColor: 'black',
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color='blue' size={26} />
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'palegoldenrod',
        }} />
        <Tab.Screen name="My Trainer" component={VRtrainer} options={{
          
          tabBarActiveBackgroundColor: 'black',
          tabBarLabel: 'Virtual trainer',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="weight-lifter" color='yellow' size={26} />
          ),
          headerStyle: {
            
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',

          headerTintColor: 'palegoldenrod',
        }} />
    </Tab.Navigator>

    )
}

export default ServiceScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'khaki',
      justifyContent: 'center',
    },
    container3: {
      flex: 1,
      backgroundColor: 'khaki',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
      borderBottomWidth: 2,
      paddingTop: 20,
      backgroundColor: 'palegoldenrod',
      width: '80%',
      alignSelf: 'center',
      marginTop: 25,
      borderRadius: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
      buttonOpen: {
        backgroundColor: "cornflowerblue",
        width: "50%",
        borderRadius: 20
      },
      buttonOpen2: {
        backgroundColor: "black",
        width: "50%",
        borderRadius: 20
      },
      buttonClose: {
        backgroundColor: "black",
        width: "80%",
        borderRadius: 10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: 'center',
        paddingBottom: 9
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
        paddingTop: 10,
        
      },
      button: {
        paddingTop: 10,
        borderRadius: 1,
        textAlign: 'center',
      },
  
      button2: {
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'black',
        marginTop: 5,
        borderColor: 'goldenrod',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      input112: {
        margin: 15,
        height: 40,
        borderWidth: 1,
        padding: 10,
     },
     submitButton: {
        backgroundColor: '#ff6666',
        padding: 10,
        margin: 15,
        height: 40,
     },
     submitButtonText:{
        textAlign: "center",
        color: 'white',
        fontSize: 18,
     },
     output112:{
        textAlign: "center",
        fontSize: 20,
     },
     title:{
        paddingTop:30,
        paddingBottom:10,
        textAlign: "center",
        fontSize: 30,
        fontWeight:"bold",
     },
     resultText:{
        paddingTop:20,
        paddingBottom:10,
        textAlign: "center",
        fontSize: 30,
        color: 'red'
     },
     label:{
        marginLeft: 15,
     },
     containernew: {
      flex: 1,
      backgroundColor: 'khaki',
      justifyContent: 'center',
    },
  });

