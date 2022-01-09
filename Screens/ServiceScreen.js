import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged,  signOut} from 'firebase/auth'
import { auth } from '../firebase';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const FIREBASE_API_ENDPOINT = 'https://mad-sem-proj-default-rtdb.firebaseio.com/'; 
const ServiceScreen = ({route}) => {
  const {user}=route.params;
  const [Vehicletype,setvehicletype]=useState('')
  const [vehicleNo,setvehicleNo]=useState('')
  const [City,setcity]=useState('')
  const [tod,settod]=useState('')
  const [location, setlocation] = useState('')
  const [destination, setdestination] = useState('')

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        destination: '',
        location: '',
        Vehicletype: '',
        vehicleNo: '',
        City: '',
        top: '',
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/users.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  
  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks.json`);
    const data = await response.json();
    console.log(data);
  };

  const deleteData = () => {
    const id = '-CHzv5IdSHayrN3aKCsdG';
    var requestOptions = {
      method: 'DELETE',
    };

    fetch(`${FIREBASE_API_ENDPOINT}/tasks/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log('Delete Response:', result))
      .catch((error) => console.log('error', error));
  };

  const updateData = () => {
    const id = '-CHzv5IdSHayrN3aKCsdG';
    var requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        Location: '',
        destination: '',
        Vehicletype: '',
        vehicleNo: '',
        City: '',
        Province: '',
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/tasks/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

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

  function Profile({ navigation }) {
  
    return (
        <View style={styles.container}>
          <Text style={{color: 'black'}}>User Email: {JSON.stringify(user)}</Text>
          <SimpleLineIcons name="picture" color='black' size={44} />
          <Button title='Logout!' 
          onPress={delogger} />
        </View>
      );
    }

function ViewRides({ navigation }) {

      return (
      <Text>{getData}</Text>
      
          
        );
        
      }
function PostRides({ navigation }) {

  return (
    <View>
                <TextInput
                placeholder='Location'
                style={styles.style1}
                value={location}
                onChangeText={text=> setlocation(text)}
                style={styles.input}
                secureTextEntry
                />
                <TextInput
                placeholder='Destination'
                style={styles.style1}
                value={destination}
                onChangeText={text=> setdestination(text)}
                style={styles.input}
                secureTextEntry
                />
                <TextInput
                placeholder='City'
                style={styles.style1}
                value={City}
                onChangeText={text=> setcity(text)}
                style={styles.input}
                secureTextEntry
                />
                <TextInput
                placeholder='Time of departure'
                style={styles.style1}
                value={tod}
                onChangeText={text=> settod(text)}
                style={styles.input}
                secureTextEntry
                />

                <Button title='Post ride' 
                onPress={()=>postData}/>

    </View>
      
    );
    
  }

  const navigation = useNavigation()
    return (
      <Tab.Navigator>
      <Tab.Screen name="Find a ride!" component={ViewRides} options={{
          tabBarColor: 'green',
          tabBarLabel: 'Book Ride!',
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
        <Tab.Screen name="Post Rides!" component={PostRides} options={{
          tabBarColor: 'red',
          tabBarLabel: 'Post ride!',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="arrow-collapse-up" color='yellow' size={26} />
          ),
        }} />
    </Tab.Navigator>
    )
}

export default ServiceScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%'    
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

