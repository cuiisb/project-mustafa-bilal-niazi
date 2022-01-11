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
  const driverpassedID=JSON.stringify(useremail);
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
  const [modalVisible, setModalVisible] = useState(false);

  const postData = async(a,b,c,d,e,f) => {
    
    await addDoc(usersrefdb , {
        driverID: driverpassedID,
        destination: a,
        location: b,
        Vehicletype: d,
        vehicleNo: e,
        City: f,
        tod: c,
    })
    alert("Posted ride!")
  };

  const deleteData = async(id) => {
    const userDoc=doc(db,'users', id)
    await deleteDoc(userDoc)
  };

  const updateData = async(id,a,b,c,d,e,f) => {
    const userDoc =doc(db, 'users', id)
    const newFields= {
      driverID: driverpassedID,
      destination: a,
      location: b,
      Vehicletype: c,
      vehicleNo: d,
      City: e,
      tod: f,
    }
    await updateDoc(userDoc, newFields)
  };

  const modalButton=(id, destination, location, Vehicletype, vehicleNo, City, tod)=>{
    if((destination=='' || location=='' || Vehicletype=='' || 
    vehicleNo=='' ||  City=='' || tod=='' )){
      alert("Fields left empty")
    }
    else{
      {updateData(id, destination, location, Vehicletype, vehicleNo, City, tod)}
    setModalVisible(!modalVisible)
    }
    
  }

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
  
    return (
        <View style={styles.container}>
          <View style={styles.container3}>
          <SimpleLineIcons name="picture" color='black' size={44} />
          <Text style={{color: 'black', fontStyle: 'bold'}}>User Email: {driverpassedID}</Text>
          
          <Button title='Logout!' 
          onPress={delogger} />
          <Button title='Switch to rider!' 
          onPress={() => navigation.navigate(('Service2'),{
            useremail: useremail
          })} />
          </View>
          
        </View>
      );
    }

function ViewRides({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [Vehicletype2,setvehicletype2]=useState('')
  const [vehicleNo2,setvehicleNo2]=useState('')
  const [City2,setcity2]=useState('')
  const [tod2,settod2]=useState('')
  const [location2, setlocation2] = useState('')
  const [destination2, setdestination2] = useState('')
      return (
        <SafeAreaView style={styles.container}
        behavior='padding'>
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                      

        <View > 
          {users.map((userinfo)=>{
            if(userinfo.driverID==driverpassedID){

            return (
              
                <View style={styles.container2}>
                  <Text style={styles.style1}>Driver ID: {userinfo.driverID}</Text>
                  <Text style={styles.style1}>Destination: {userinfo.destination} Location: {userinfo.location}  </Text>
                  <Text style={styles.style1}>Time of departure: {userinfo.tod} </Text>
                  <Text style={styles.style1}>vehicle: {userinfo.Vehicletype} No: {userinfo.vehicleNo} </Text>
                  <Text style={styles.style1}>City: {userinfo.City} </Text>
                  <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      alert("Not updated");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View>
                      <TextInput
                      placeholder='Location'
                      style={styles.style1}
                      value={location2}
                      onChangeText={text=> setlocation2(text)}
                      style={styles.input}
                      
                      />
                      <TextInput
                      placeholder='Destination'
                      style={styles.style1}
                      value={destination2}
                      onChangeText={text=> setdestination2(text)}
                      style={styles.input}
                      
                      />
                      <TextInput
                      placeholder='City'
                      style={styles.style1}
                      value={City2}
                      onChangeText={text=> setcity2(text)}
                      style={styles.input}
                      
                      />
                      <TextInput
                      placeholder='Time of departure'
                      style={styles.style1}
                      value={tod2}
                      onChangeText={text=> settod2(text)}
                      style={styles.input}
                      
                      />
                      <TextInput
                      placeholder='Vehicle Type'
                      style={styles.style1}
                      value={Vehicletype2}
                      onChangeText={text=> setvehicletype2(text)}
                      style={styles.input}
                      
                      />
                      <TextInput
                      placeholder='Vehicle id'
                      style={styles.style1}
                      value={vehicleNo2}
                      onChangeText={text=> setvehicleNo2(text)}
                      style={styles.input}
                      
                      /></View>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={()=>{modalButton(userinfo.id,destination2,location2,Vehicletype2,vehicleNo2,
                          City2,tod2)}}
                      >
                        <Text style={styles.textStyle}>Update</Text>
                      </TouchableOpacity>
                      
                      </View>
                      <View>
                        <Button
                        title='Cancel'
                        onPress={()=>setModalVisible(!modalVisible)}></Button>
                      </View>
                    </View>
                  </Modal>
                  <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.textStyle}>Edit information</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonOpen2]}
                    onPress={()=>{deleteData(userinfo.id)}}
                  >
                    <Text style={styles.textStyle}>Delete Post</Text>
                  </TouchableOpacity>
                  
                  </View>
                  
                </View>
              
             
              
            );}
          })}
        </View></ScrollView></SafeAreaView>
          
        );
        
      }

function PostRides({navigation}) {

  const [Vehicletype1,setvehicletype1]=useState('')
  const [vehicleNo1,setvehicleNo1]=useState('')
  const [City1,setcity1]=useState('')
  const [tod1,settod1]=useState('')
  const [location1, setlocation1] = useState('')
  const [destination1, setdestination1] = useState('')

  const poster=(a,b,c,d,e,f)=>{

    if(a=='' || b=='' || c=='' || 
    d=='' ||  e=='' || f=='' ){
      alert("You left some field(s) empty!")
    }
    else{
      postData(a,b,c,d,e,f)
    }
  }

  return (
    <SafeAreaView style={styles.container}
        behavior='padding'>
            <View>
              
                
            <View style={{alignSelf:'center', width: '70%'}}>


                <TextInput
                placeholder='Location' placeholderTextColor='gray'
                onChangeText={text=> setlocation1(text)}
                value={location1}
                style={styles.input}
                
                ></TextInput></View>
                <View style={{alignSelf:'center', width: '70%'}}>
                <TextInput
                placeholder='Destination' placeholderTextColor='gray'
                value={destination1}
                onChangeText={text=> {setdestination1(text)}}
                style={styles.input}
                
                ></TextInput></View>
                <View style={{alignSelf:'center', width: '70%'}}>
                <TextInput
                placeholder='City' placeholderTextColor='gray'
                value={City1}
                onChangeText={text=> {setcity1(text)}}
                style={styles.input}
                
                /></View>
                <View style={{alignSelf:'center', width: '70%'}}>
                <TextInput
                placeholder='Time of departure' placeholderTextColor='gray'
                value={tod1}
                onChangeText={text=> {settod1(text)}}
                style={styles.input}
                
                /></View>
                <View style={{alignSelf:'center', width: '70%'}}>
                <TextInput
                placeholder='Vehicle Type' placeholderTextColor='gray'
                value={Vehicletype1}
                onChangeText={text=> {setvehicletype1(text)}}
                style={styles.input}
                
                /></View>
                <View style={{alignSelf:'center', width: '70%'}}>
                <TextInput
                placeholder='Vehicle id' placeholderTextColor='gray'
                value={vehicleNo1}
                onChangeText={text=> {setvehicleNo1(text)}}
                style={styles.input}
                
                /></View>
              <View style={{alignSelf:'center', width: '50%'}}>
              <TouchableOpacity
               onPress={()=>poster(destination1,location1,tod1,Vehicletype1,vehicleNo1,City1)}
              style={[styles.button2,styles.buttonOutline,{marginTop:20}]}>
                <Text  style={styles.buttonText}>
                  Post!
                </Text>
              </TouchableOpacity>
              </View>

              </View>
        </SafeAreaView>
      
    );
    
  }

  const navigation = useNavigation()
    return (
      
      <Tab.Navigator>
        
      <Tab.Screen name="My Posted Rides" component={ViewRides} options={{
          tabBarColor: 'green',
          tabBarLabel: 'Posted Ride!',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="car" color='red' size={26} />
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',

          headerTintColor: 'palegoldenrod',
        }}  />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarColor: 'yellow',
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
        <Tab.Screen name="Post Rides" component={PostRides} options={{
          
          tabBarColor: 'red',
          tabBarLabel: 'Post ride!',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="arrow-collapse-up" color='yellow' size={26} />
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
  });

