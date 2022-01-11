import React, { useState } from 'react'
import { SafeAreaView ,TextInput,Pressable, Modal ,Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged,  signOut} from 'firebase/auth'
import { auth } from '../firebase';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { db } from '../firebase-cruds';
import {collection, getDocs} from 'firebase/firestore'
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const ServiceScreen2 = ({route}) => {
  const {useremail}=route.params;
  const driverpassedID2=JSON.stringify(useremail)
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

  const [Vehicletype,setvehicletype]=useState('')
  const [vehicleNo,setvehicleNo]=useState('')
  const [City,setcity]=useState('')
  const [tod,settod]=useState('')
  const [location, setlocation] = useState('')
  const [destination, setdestination] = useState('')

  const [getUser, setUser]= useState({})
  onAuthStateChanged( auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleLogout = async() => {
    await signOut(auth)
  }
  const rideBooked=(a,b,c,d,e,f)=>{
    setdestination(a)
    setlocation(b)
    settod(c)
    setvehicletype(d)
    setvehicleNo(e)
    setcity(f)
  }

  const checkbooking=(a,b,c,d,e,f)=>{
    if(destination=='' || location=='' || Vehicletype=='' || 
    vehicleNo=='' ||  City=='' || tod=='' ){
        return (
            <View><Text>No rides booked yet.</Text></View>

        )
    }
    else{
        rideBooked(a,b,c,d,e,f)
    }
  }

  const cancelbooking=()=>{
        setdestination('')
        setlocation('')
        settod('')
        setvehicletype('')
        setvehicleNo('')
        setcity('')
        alert("Booking cancelled!")
  }
  const delogger=()=>{
    handleLogout
    {navigation.navigate('Login')}
  }
  function Profile() {
  
    return (
        <View style={styles.container}>
          <Text style={{color: 'black'}}>User Email:{driverpassedID2} </Text>
          <SimpleLineIcons name="picture" color='black' size={44} />
          <Button title='Logout!' 
          onPress={delogger} />
          <Button title='Switch to driver!' 
          onPress={() => navigation.navigate(('Service'),{
            useremail: useremail
          })} />
        </View>
      );
    }

function ViewRides() {

      return (
        <SafeAreaView style={styles.container}
        behavior='padding'>
          <ScrollView>
        <View> 
          {users.map((userinfo)=>{
            return (
              
                <View style={styles.container2}>
                  <Text style={styles.style1}>Driver ID: {userinfo.driverID}</Text>
                  <Text style={styles.style1}>Destination: {userinfo.destination}   Location: {userinfo.location}  </Text>
                  <Text style={styles.style1}>Time of departure: {userinfo.tod} </Text>
                  <Text style={styles.style1}>vehicle: {userinfo.Vehicletype} No: {userinfo.vehicleNo} </Text>
                  <Text style={styles.style1}>City: {userinfo.City} </Text>
                  
                  <Button title='Book Ride'
                    onPress={()=>{checkbooking(userinfo.destination, 
                    userinfo.location, userinfo.tod ,userinfo.Vehicletype
                    ,userinfo.vehicleNo, userinfo.City)}}/>
                </View>
              
            );
          })}
        </View></ScrollView></SafeAreaView>
          
        );
        
      }


function BookedRide() {
    if(destination=='' || location=='' || Vehicletype=='' || 
    vehicleNo=='' ||  City=='' || tod=='' ){
        return (
            <View><Text>No rides booked yet.</Text></View>

        )
    }else{
        return (
            <View>
                <Text>RIDE BOOKED! </Text>
                <Text>--Ride Details--</Text>
                <Text style={styles.style1}>Destination: {destination} Location: {location}  </Text>
                <Text style={styles.style1}>Time of departure: {tod} </Text>
                <Text style={styles.style1}>vehicle: {Vehicletype} No: {vehicleNo} </Text>
                <Text style={styles.style1}>City: {City} </Text>
                <Button 
                title="Cancel Booking"
                onPress={cancelbooking}
                />
            </View>
        );
    }

    
  }

  const navigation = useNavigation()

    return (
      
      <Tab.Navigator>
      <Tab.Screen name="Posted Rides!" component={ViewRides} options={{
          tabBarColor: 'green',
          tabBarLabel: 'Posted Rides!',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="car" color='red' size={26} />
          ),
        }}  />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarColor: 'yellow',
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color='blue' size={26} />
          ),
        }} />
        <Tab.Screen name="Ride Booked" component={BookedRide} options={{
          tabBarColor: 'red',
          tabBarLabel: 'Booked ride',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="swap-vertical-bold" color='yellow' size={26} />
          ),
        }} />
    </Tab.Navigator>

    )
}

export default ServiceScreen2

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
      backgroundColor: 'khaki',
      borderRadius: 10,
      marginBottom: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
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
        paddingTop: 20,
      },
      style11: {
        borderBottomWidth: 2,
        paddingTop: 20,
        backgroundColor: 'goldenrod'        
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
        textAlign: 'center',
      },
      Scrollstyle: {
        alignContent: 'center',
        backgroundColor: 'khaki',
        alignContent:'center',
      
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
      Scrollpost: {
        borderRadius: 10,
        width: '90%',
      },
  });

